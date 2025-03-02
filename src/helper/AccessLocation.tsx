import Geolocation from 'react-native-geolocation-service';
import {Alert} from 'react-native';
import {requestLocationPermission} from './LocationPermission'; // Assuming this is defined elsewhere

export const getCurrentLocationWithFallback = (
  setCoordinates: any,
  setLoading?: any,
) => {
  const fallbackTimeout = setTimeout(() => {
    Alert.alert('Unable to retrieve location. Please try again.');
    setLoading(false);
  }, 10000);

  Geolocation.getCurrentPosition(
    async position => {
      if (position) {
        console.log(position);
        clearTimeout(fallbackTimeout);
        setCoordinates(position);
        setLoading(false);
      }
    },
    error => {
      clearTimeout(fallbackTimeout);
      console.log(error.code, error.message);
      Alert.alert('Error retrieving location: ' + error.message);
      setLoading(false);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};

export const requestLocationPermissionAndGetLocation = async (
  setCoordinates: any,
  setLoading: any,
) => {
  try {
    await requestLocationPermission();
    getCurrentLocationWithFallback(setCoordinates, setLoading);
  } catch (err) {
    console.warn(err);
    setLoading(false);
  }
};

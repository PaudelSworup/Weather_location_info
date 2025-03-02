import {PermissionsAndroid} from 'react-native';

export const requestLocationPermission = async () => {
  try {
    const isGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (isGranted) {
      console.log('Location permission is already granted');

      // You can use the Location here if necessary
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Road app Location Permission',
          message: 'Road needs access to your Location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    }
  } catch (err) {
    console.warn(err);
  }
};

export const fetchCoordinates = async (cityName: string) => {
  console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=50a7aa80fa492fa92e874d23ad061374`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data?.coord) {
      console.log(data);
      const {lat, lon} = data?.coord;
      return {
        latitude: lat,
        longitude: lon,
        icon: data?.weather,
      };
    } else {
      throw new Error('City not found. Please try again.');
    }
  } catch (error) {
    throw new Error('Failed to fetch coordinates. Please try again.');
  }
};

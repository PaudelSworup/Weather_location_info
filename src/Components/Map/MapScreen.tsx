import {
  View,
  Text,
  SafeAreaView,
  Alert,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  fetchCoordinates,
  requestLocationPermission,
} from '../../helper/LocationPermission';
import Geolocation from 'react-native-geolocation-service';
import {TextInput} from 'react-native-paper';
import {MagnifyingGlassCircleIcon as SearchIcon} from 'react-native-heroicons/solid';

const MapScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [coordinate, setCoordinates] = useState<any>();
  const [mark, setMark] = useState<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [img, setImg] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [Weatherinfo, setWeatherInfo] = useState<any>();

  const requestLocationPermissionAndGetLocation = async () => {
    try {
      await requestLocationPermission();
      getCurrentLocationWithFallback();
    } catch (err) {
      console.warn(err);
    }
  };

  // Function to get current location with a fallback mechanism
  const getCurrentLocationWithFallback = () => {
    const fallbackTimeout = setTimeout(() => {
      Alert.alert('Unable to retrieve location. Please try again.');
    }, 10000);

    Geolocation.getCurrentPosition(
      position => {
        clearTimeout(fallbackTimeout);
        if (position) {
          setCoordinates(position);
        }
      },
      error => {
        clearTimeout(fallbackTimeout);
        console.log(error.code, error.message);
        Alert.alert('Error retrieving location: ' + error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    requestLocationPermissionAndGetLocation();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const coords = await fetchCoordinates(searchQuery);
        if (coords) {
          const {latitude, longitude, icon} = coords;
          console.log(icon[0].icon);
          setImg(icon[0].icon);
          setWeatherInfo(icon[0]);
          const newRegion = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.02,
          };
          mapRef.current?.animateToRegion(newRegion, 1000); // 1000ms for smooth transition
          setMark({latitude: latitude, longitude: longitude});
        }
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Error', 'Please enter a city name.');
    }
  };

  const initialRegion = {
    latitude: coordinate ? coordinate?.coords?.latitude : 0,
    longitude: coordinate ? coordinate?.coords?.longitude : 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <SafeAreaView>
      <View className="h-full">
        <View className="mt-3 flex-row justify-between items-center p-3">
          <TextInput
            className="bg-slate-100 flex-1"
            mode="outlined"
            outlineColor="black"
            activeOutlineColor="black"
            label="Search"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <SearchIcon onPress={handleSearch} size={hp(3.5)} color="#111" />
        </View>
        <MapView
          className="flex-1"
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          showsCompass
          showsUserLocation={true}
          loadingEnabled={true}
          initialRegion={initialRegion}
          mapType="standard"
          onPress={e => {
            console.log(e.nativeEvent.coordinate);
            setMark(e.nativeEvent.coordinate);
          }}>
          {/* {mark && <Marker draggable coordinate={mark} />} */}
          {mark && (
            <Marker
              onPress={() => setModalVisible(true)}
              coordinate={mark}
              description="hello"
              image={{
                uri: `https://openweathermap.org/img/wn/${img}@4x.png`,
              }}
            />
          )}
        </MapView>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              elevation: 5,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Weather Info</Text>
            <Text> {Weatherinfo?.description}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default MapScreen;

import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationConstant from '../../Constant/NavigationConstant';
import {navigate} from '../../helper/NavigationService';

// Mock slides data
const slides = [
  {
    key: 1,
    title: 'choose your product',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: require('../../../assets/asset3.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Add to cart',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: require('../../../assets/asset2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Easy and Fast Delivery',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: require('../../../assets/asset1.png'),
    backgroundColor: '#22bcb5',
  },
];

const OnBoardScreen = () => {
  const {width} = useWindowDimensions();

  const imageHeight = width > 700 ? hp(50) : hp(35);

  const handleDone = async () => {
    try {
      await AsyncStorage.setItem(NavigationConstant.BOARDINGKEY, 'true');
      navigate(NavigationConstant.LOGIN);
    } catch (error) {
      console.error('Error setting onboarding flag:', error);
      // Optionally, show a toast or alert to the user
    }
  };

  const renderItem = ({item}: any) => (
    <SafeAreaView>
      <View className="h-full p-4 justify-around items-center bg-blue-200">
        <View
          style={{
            width: wp(90),
            height: imageHeight,
            borderRadius: 10,
            overflow: 'hidden', // Important for making the borderRadius work
          }}>
          <Image
            source={item.image}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="stretch"
          />
        </View>

        <View className="gap-1 justify-center items-center">
          <Text
            className=" font-bold text-gray-800 mb-4"
            style={{fontSize: hp(3)}}>
            {item.title}
          </Text>

          <Text
            className=" text-gray-600 text-center"
            style={{fontSize: hp(2)}}>
            {item.text}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={handleDone}
      // onDone={() => navigate(Navigationconstant.LOGIN)}
      bottomButton={width > 700 ? true : false}
    />
  );
};

export default OnBoardScreen;

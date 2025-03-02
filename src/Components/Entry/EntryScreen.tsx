import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {navigate} from '../../helper/NavigationService';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppSelector} from '../../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationConstant from '../../Constant/NavigationConstant';

const EntryScreen = () => {
  const {token, userInfo} = useAppSelector(state => state.auth);
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (token && userInfo) {
        navigate(NavigationConstant.TAB);
      } else {
        const value = await AsyncStorage.getItem(
          NavigationConstant.BOARDINGKEY,
        );
        if (value !== null) {
          navigate(NavigationConstant.LOGIN);
        } else {
          navigate(NavigationConstant.BOARDING);
        }
      }
    }, 3000);

    // Clear timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);
  return (
    <SafeAreaView>
      <View className="h-screen justify-center items-center bg-black/95">
        <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
        <LottieView
          speed={0.8}
          autoPlay
          style={{width: wp(60), height: hp(50)}}
          source={require('../../../assets/style.json')}
        />
      </View>
    </SafeAreaView>
  );
};

export default EntryScreen;

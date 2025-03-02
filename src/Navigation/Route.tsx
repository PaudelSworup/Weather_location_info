import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {navigationRef} from '../helper/NavigationService';
import MainStack from './MainStack';

const Route = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer ref={navigationRef}>
        <MainStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Route;

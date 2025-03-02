import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationConstant from '../Constant/NavigationConstant';
import {BoardScreen, LaunchScreen, LoginScreen, MapScreen} from '..';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavigationConstant.MAP}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={NavigationConstant.ENTRY} component={LaunchScreen} />

      <Stack.Screen
        name={NavigationConstant.BOARDING}
        component={BoardScreen}
      />

      <Stack.Screen name={NavigationConstant.LOGIN} component={LoginScreen} />
      <Stack.Screen name={NavigationConstant.MAP} component={MapScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;

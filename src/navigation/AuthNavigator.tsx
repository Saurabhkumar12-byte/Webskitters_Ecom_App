import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/Auth/LoginScreen';
import SignUpScreen from '../components/Auth/SignUpScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;

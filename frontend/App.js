import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  ImageBackground, StyleSheet, Text, View } from 'react-native';
import LogInForm from './src/components/auth/LoginForm';
import SignUpForm from './src/components/user/SignUpForm';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="LogIn" component={LogInForm} />
      <Stack.Screen name="SignUp" component={SignUpForm} />
     </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

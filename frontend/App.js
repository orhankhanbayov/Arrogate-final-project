import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import LogInForm from './src/components/auth/LoginForm';
import SignUpForm from './src/components/user/SignUpForm';
import MainContainer from './src/components/navigation/mainContainer';
import LocationOneClues from './src/components/locations/LocationOneClues';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Camera1 from './src/components/landmarkCamera/landmark';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LogIn" component={LogInForm} />
        <Stack.Screen name="SignUp" component={SignUpForm} />
        <Stack.Screen name="MainContainer" component={MainContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

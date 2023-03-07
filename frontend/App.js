import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import LogInForm from './src/components/auth/LoginForm';
import SignUpForm from './src/components/user/SignUpForm';
import MainContainer from './src/components/navigation/mainContainer';
import LocationOneClues from './src/components/locations/LocationOneClues';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Camera1 from './src/components/landmarkCamera/landmark';
const Stack = createStackNavigator();
import RunningScoreContext from 'frontend/src/components/landmarkCamera/RunningScoreContext.js';



export default function App() {
  const [runningScore, setRunningScore] = useState(0);
  return (
    <RunningScoreContext.Provider value={{ runningScore, setRunningScore }}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LogIn" component={LogInForm} />
        <Stack.Screen name="SignUp" component={SignUpForm} />
        <Stack.Screen name="MainContainer" component={MainContainer} />
      </Stack.Navigator>
    </NavigationContainer>
    </RunningScoreContext.Provider>
  );
}

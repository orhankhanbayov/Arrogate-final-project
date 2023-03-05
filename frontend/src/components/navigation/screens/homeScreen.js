import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ChooseRoutes from '../../chooseRoutes/chooseRoutes';
import LocationOneClues from '../../locations/LocationOneClues';
import CongratulationsNextClue from '../../congraulationsNextClue/congratulationsNextClue';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChooseRoutes" component={ChooseRoutes} />
      <Stack.Screen name="LocationOneClues" component={LocationOneClues} />
      <Stack.Screen
        name="CongratulationsNextClue"
        component={CongratulationsNextClue}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;
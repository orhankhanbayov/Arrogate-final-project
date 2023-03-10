import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ChooseRoutes from '../../chooseRoutes/chooseRoutes';
import LocationOneClues from '../../locations/LocationOneClues';
import CongratulationsNextClue from '../../congraulationsNextClue/congratulationsNextClue';
import Finished from '../../finished/finished';
import LandmarkCamera from '../../landmarkCamera/landmark';
import RouteDescription from '../../routeDescription/routeDescription';
import TripAd from '../../nearBy/nearBy';
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
    <Stack.Navigator>
      <Stack.Screen
        name="ChooseRoutes"
        component={ChooseRoutes}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="LocationOneClues"
        component={LocationOneClues}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="CongratulationsNextClue"
        component={CongratulationsNextClue}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="Finished"
        component={Finished}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Stack.Screen
        name="LandmarkCamera"
        component={LandmarkCamera}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RouteDescription"
        component={RouteDescription}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TripAdvisor"
        component={TripAd}
        screenOptions={{ headerShown: true, headerBackTitleVisible: true }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;

import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// import MapView from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState();

  const getUserCoords = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };
  getUserCoords();
  // useEffect(() => {});
  return (
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: 51.506554,
        longitude: -0.129115,
        latitudeDelta: 0.000808,
        longitudeDelta: 0.000204,
      }}
      showsMyLocationButton={true}
      showsUserLocation={true}
    ></MapView>
  );
};

export default MapScreen;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

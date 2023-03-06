import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
  const destination = {
    latitude: 51.504500000000000171,
    longitude: -0.086499999999999993561,
  };

  const getUserCoords = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };
  getUserCoords();
  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
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
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search"
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyDjVEQ92HJFFPzfnj1LaB1EQmugY21AZ3E',
          language: 'en',
          components: 'country:uk',
        }}
      />
    </>
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

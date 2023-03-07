import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState } from 'react';
import { useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { MapViewDirections } from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';

import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
const MapScreen = () => {
  const [location, setLocation] = useState();
  const [destination, setDestination] = useState();
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDjVEQ92HJFFPzfnj1LaB1EQmugY21AZ3E';

  Geolocation.getCurrentPosition((info) => setLocation(info));

  const getDirection = async () => {
    let response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${location}=${destination}=${GOOGLE_MAPS_APIKEY}`
    );
  };
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
      >
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={async (data, details = null) => {
            console.log(data.place_id);
            setDestination(data.place_id);
            console.log(destination);
          }}
          query={{
            key: 'AIzaSyDjVEQ92HJFFPzfnj1LaB1EQmugY21AZ3E',
            language: 'en',
          }}
        />
      </MapView>
    </>
  );
};

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

export default MapScreen;

import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState } from 'react';
import { useEffect } from 'react';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { MapViewDirections } from 'react-native-maps-directions';
import { Platform, PermissionsIOS } from 'react-native';
import { GOOGLE_API } from '@env';
import Config from 'react-native-config';

import * as Location from 'expo-location';
import decodePolyline from 'decode-polyline';

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
  const [coords, setCoords] = useState({ coords: [] });
  const [show, setShow] = useState(false);

  const GOOGLE_MAPS_APIKEY = `${GOOGLE_API}`;
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const getDirection = async (place_id) => {
    let response =
      await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${location.coords.latitude},${location.coords.longitude}&destination=place_id:${place_id}&mode=walking&key=${GOOGLE_MAPS_APIKEY}
    `);
    let respJson = await response.json();
    let points = decodePolyline(respJson.routes[0].overview_polyline.points);

    setCoords({ coords: points });
    setShow(true);
    console.log(response.status);
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
        {show ? (
          <Polyline
            coordinates={coords.coords}
            strokeColor="#000"
            strokeColors={['#7F0000', '#00000000', '#B24112', '#E5845C']}
            strokeWidth={6}
          />
        ) : (
          ''
        )}
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={async (data, details = null) => {
            console.log(data.place_id);
            await getDirection(data.place_id);
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
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

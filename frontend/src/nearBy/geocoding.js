import  React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
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

const Places = () => {
    const [location, setLocation] = useState(null);
    const [places, setPlaces] = useState([]);
  
    const googlePlaces = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
        const apiKey = process.env.MY_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=100&type=restaurant&keyword=food&key=${apiKey}`;
        const options = { method: 'GET', headers: { accept: 'application/json' } };
  
        fetch(url, options)
          .then((response) => response.json())
          .then((data) => setPlaces(data.results))
          .catch((error) => console.error(error));
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      googlePlaces();
    }, []);
     console.log(places)

return ( 
    <View>
        
    </View>
)

};
  





export default Places;
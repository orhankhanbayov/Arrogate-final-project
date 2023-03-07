import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
  } from 'react-native';




const TripAd = () => {
  const [location, setLocation] = useState(null);

  const nearBy = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);

      const apiKey = process.env.API_KEY;
      const url = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${coords.latitude}%2C${coords.longitude}&key=${apiKey}&category=restaurants&radius=400&radiusUnit=m&language=en`;
      const options = { method: 'GET', headers: { accept: 'application/json' } };

      fetch(url, options)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    nearBy();
  }, [])

  return (
    <View>
        <Text>Things to do in this area:
            
        </Text>
    </View>
  )
 
};

export default TripAd;

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
  const [restaurants, setRestaurants] = useState([]);

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
        .then((data) => setRestaurants(data.data))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }      
  
  };

  useEffect(() => {
    nearBy();
  }, [])

  return (

    <View style={styles.container}>
      {restaurants.map((restaurant, index) => (
        <View key={index}>
          <Text>Name: {restaurant.name}</Text>
          <Text>Address: {restaurant.address_obj.address_string}</Text>
        </View>
      ))}
    </View>
)
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF3F1',
  }
});

export default TripAd;

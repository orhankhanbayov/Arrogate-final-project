import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import {
    ImageBackground,
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
<View style={styles.page}> 
    <ImageBackground
        source={require('../images/background.png')}
        resizeMode="cover"
        style={styles.background}
    ></ImageBackground>
    <Text style={styles.header}>Restaurants near you</Text>


      <View >
      {restaurants.map((restaurant, index) => (
        <View key={index} style={styles.container}>
          <Text style={styles.text}>Name: <Text style={styles.name}>{restaurant.name}</Text></Text>
          <Text style={styles.text}>Address: <Text style={styles.address}>{restaurant.address_obj.address_string}</Text></Text>
        </View>
      ))}
      </View>
</View>
)
  
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    flexDirection: 'column',
    color: '#204376',
    fontWeight: 'bold',
    marginTop: 70,
    marginLeft: 90,
    marginRight: 50,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    borderWidth: 1,
  },
  address: {
    fontSize: 17,
    color: '#204376',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  name: {
    fontSize: 17,
    color: '#204376',
    textAlign: 'center',
  }

});

export default TripAd;

import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
  } from 'react-native';

// Example API returned object : 
// {
//   "location_id": "3617159",
//   "name": "Tatte Bakery and Cafe",
//   "distance": "0.046736929341611735",
//   "bearing": "northeast",
//   "address_obj": {
//     "street1": "1003 Beacon St",
//     "street2": "",
//     "city": "Brookline",
//     "state": "Massachusetts",
//     "country": "United States",
//     "postalcode": "02446-5609",
//     "address_string": "1003 Beacon St, Brookline, MA 02446-5609"
//   }
// },


const TripAd = () => {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const nearBy = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const apiKey = process.env.API_KEY;

      // fetch restaurants based on users location
      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
      const urlPlaces = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${coords.latitude}%2C${coords.longitude}&key=${apiKey}&category=restaurants&radius=400&radiusUnit=m&language=en`;
      const optionsPlaces = { method: 'GET', headers: { accept: 'application/json' } };

      fetch(urlPlaces, optionsPlaces)
        .then((response) => response.json())
        .then(async (data) => {
          setRestaurants(data.data);

          // fetch reviews by location id for each restaurant
          const locationIDs = data.data.slice(0, 5).map((restaurant) => restaurant.location_id);

          for (const id of locationIDs) {
            const urlReviews = `https://api.content.tripadvisor.com/api/v1/location/${id}/reviews?key=${apiKey}&language=en`;
            const optionsReviews = { method: 'GET', headers: { accept: 'application/json' } };
            const response = await fetch(urlReviews, optionsReviews);
            const reviewData = await response.json();
            console.log(reviewData);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    nearBy();
  }, []);

  


  return (
<View style={styles.page}> 
    <ImageBackground
        source={require('../images/background.png')}
        resizeMode="cover"
        style={styles.background}
    ></ImageBackground>
    <Text style={styles.header}>Restaurants near you</Text>


      <View >
      {restaurants.slice(0, 5).map((restaurant, index) => (
        <View key={index} style={styles.container}>
          <Text style={styles.text}>Name: <Text style={styles.name}>{restaurant.name}</Text></Text>
          <Text style={styles.text}>Address: <Text style={styles.address}>{restaurant.address_obj.address_string}</Text></Text>
       {restaurant.review && (
              <>
                <Text style={styles.text}>Rating: {console.log(restaurant.review.rating)}</Text>
                <Image source={{ uri: restaurant.review.rating_image_url }} />
                <Text style={styles.text}>Latest Review:</Text>
                <Text style={styles.text}>{restaurant.review.title}</Text>
                <Text style={styles.text}>{restaurant.review.text}</Text>
              </>
            )}
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

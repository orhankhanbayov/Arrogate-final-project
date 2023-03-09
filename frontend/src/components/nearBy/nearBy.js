import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { API_KEY } from '@env';

const TripAd = () => {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [reviews, setReviews] = useState({});
  const [showReviews, setShowReviews] = useState(
    new Array(restaurants.length).fill(false)
  );

  const nearBy = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const apiKey = API_KEY;

      // fetch restaurants based on users location
      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
      const urlPlaces = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${coords.latitude}%2C${coords.longitude}&key=${apiKey}&category=restaurants&radius=400&radiusUnit=m&language=en`;
      const optionsPlaces = {
        method: 'GET',
        headers: { accept: 'application/json' },
      };

      fetch(urlPlaces, optionsPlaces)
        .then((response) => response.json())
        .then(async (data) => {
          setRestaurants(data.data);

          // fetch reviews by location id for each restaurant
          const locationIDs = data.data
            .slice(0, 5)
            .map((restaurant) => restaurant.location_id);

          for (const id of locationIDs) {
            const urlReviews = `https://api.content.tripadvisor.com/api/v1/location/${id}/reviews?key=${apiKey}&language=en`;
            const optionsReviews = {
              method: 'GET',
              headers: { accept: 'application/json' },
            };
            const response = await fetch(urlReviews, optionsReviews);
            const reviewData = await response.json();
            console.log(reviewData)
            setReviews((prevReviews) => ({
              ...prevReviews,
              [id]: reviewData.data,
            }));
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleReviews = (index) => {
    const updatedShowReviews = [...showReviews];
    updatedShowReviews[index] = !updatedShowReviews[index];
    setShowReviews(updatedShowReviews);
  };

  const getStars = (rating) => {
    let stars = '';
    for (let i = 0; i < Math.floor(rating); i++) {
      stars += '★';
    }
    if (rating % 1 > 0 && rating % 1 <= 0.5) {
      stars += '½';
    } else if (rating % 1 > 0.5) {
      stars += '★';
    }
    return stars;
  };

  useEffect(() => {
    nearBy();
  }, []);

  return (
    <View style={styles.page}>
      <ImageBackground
        source={require('../../images/background.png')}
        resizeMode="cover"
        style={styles.background}
      ></ImageBackground>
      <Text style={styles.header}>Restaurants near you</Text>
      <ScrollView>
        {restaurants.slice(0, 5).map((restaurant, index) => (

          <View key={index} style={styles.container}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.address}>{restaurant.address_obj.address_string}</Text>
           
            <TouchableOpacity onPress={() => toggleReviews(index)}>
              <Text style={styles.reviewsTitle}>Reviews</Text>
            </TouchableOpacity>

            {showReviews[index] && (
              <View>
                {reviews[restaurant.location_id]?.map((review, index) => (
                  <View key={index} style={styles.reviews}>
                    <Text style={styles.ratings1}>
                      Rating: <Text>{getStars(review.rating)} </Text>
                    </Text>
                    <Text style={styles.ratings2}>
                      Title: <Text>{review.title} </Text>
                    </Text>
                    <Text style={styles.textReviews}>
                      {review.text}
                      {'\n'}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
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
    zIndex: -1,
  },
  container: {
    marginTop: 20,
    padding: 10, 
    borderColor: 'gray',
    borderMargin: 5,
  },
  address: {
    fontSize: 14,
    color: 'gray',
    justifyContent: 'space-evenly',
    marginHorizontal: 15,
    textAlign: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#204376',
  },
  reviewsTitle: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#204376',
    marginHorizontal: 15,
  },
  reviews: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#204376',
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 5, 
  },
  ratings1: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    color: '#204376',
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 5, 
  },
  ratings2: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    color: 'charcoal',
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 5, 
  },
  textReviews: {
    fontSize: 18,
    justifyContent: 'space-evenly',
    textAlign: 'justify',
    color: '#204376',
    marginHorizontal: 15,
  },
  name: {
    fontSize: 25,
    color: '#204376',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default TripAd;

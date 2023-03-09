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
            <Text style={styles.text}>
              Name: <Text style={styles.name}>{restaurant.name}</Text>
            </Text>
            <Text>
              Address: <Text>{restaurant.address_obj.address_string}</Text>
            </Text>
            <TouchableOpacity onPress={() => toggleReviews(index)}>
              <Text style={styles.text}>Reviews</Text>
            </TouchableOpacity>
            {showReviews[index] && (
              <View>
                {reviews[restaurant.location_id]?.map((review, index) => (
                  <View key={index} style={styles.review}>
                    <Text>
                      Rating: <Text>{getStars(review.rating)} </Text>
                    </Text>
                    <Text>
                      Title: <Text>{review.title} </Text>
                    </Text>
                    <Text>
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
  },
});

export default TripAd;

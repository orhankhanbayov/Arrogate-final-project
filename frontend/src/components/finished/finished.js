import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const Finished = ({ navigation, route }) => {
  useEffect(() => {
    const scores = async () => {
      let token = await SecureStore.getItemAsync('token');
      let email = await SecureStore.getItemAsync('email');

      let response = await fetch(
        'https://mystery-route-backend.onrender.com/account',
        {
          method: 'post',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            trophies: 1,
            coins: route.params.runningScore,
          }),
        }
      );
      console.log(response.status);
    };
    scores();
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>
        Congratulations you have solved the challenge!
      </Text>

      <View style={styles.image}>
        <Image
          source={require('../../images/trophy.png')}
          style={styles.image}
        />
      </View>

      <Text style={styles.subtitle}>Explore the area...</Text>

      <View style={styles.buttonContainer}>
        <Text style={styles.button}> Add map here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#EAF3F1',
  },
  title: {
    fontSize: 20,
    color: '#204376',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 14,
    color: '#204376',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    marginBottom: 10,
  },
  image: {
    resizeMode: 'contain',
    height: 280,
    width: 280,
    marginLeft: 27,
  },
  button: {
    fontSize: 14,
    color: '#204376',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    marginBottom: 30,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#204376',
    borderRadius: 25,
    borderTopWidth: 50,
    borderBottomWidth: 50,
  },
});

export default Finished;

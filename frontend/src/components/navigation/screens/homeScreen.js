import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let token = await SecureStore.getItemAsync('token');

      if (token) {
        const response = await fetch(
          'https://mystery-route-backend.onrender.com/routes',
          {
            method: 'get',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data.routes[0].locations[0].clue1);
        await SecureStore.setItemAsync('token', data.token);
        setRoutes(data.routes);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <ImageBackground source={require('../../../images/background.png')} resizeMode='cover' style={styles.background}></ImageBackground>
      <Text>Choose the area you want to explore</Text>

      {routes.map((route) => (
        <Text key={route._id}>
          {route.name}
          {'\n'}
          {route.bio}
          {'\n'}
          {route.time}
          {'\n'}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '106%',
  },
});

export default HomeScreen

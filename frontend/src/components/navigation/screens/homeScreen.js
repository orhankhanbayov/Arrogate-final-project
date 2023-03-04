import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
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

      {/* Solved Logo */}
      <View style={styles.logo}>
        <Image
          source={require('../../../images/solved-logo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Choose the area you want to explore:</Text>

      {/* Area banner 1 - South Bank */}
      <View style={styles.banner}>
        <Image
          source={require('../../../images/area1-banner.png')}
          style={styles.banner}
        />
      </View>

      {/* Area banner 2 - City of London */}
      <View style={styles.banner}>
        <Image
          source={require('../../../images/area2-banner.png')}
          style={styles.banner}
        />
      </View>

      {/* Area banner 3 - West End */}
      <View style={styles.banner}>
        <Image
          source={require('../../../images/area3-banner.png')}
          style={styles.banner}
        />
      </View>

      {/* {routes.map((route) => (
        <Text key={route._id}>
          {route.name}
          {'\n'}
          {route.bio}
          {'\n'}
          {route.time}
          {'\n'}
        </Text>
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '101%',
    height: '104.5%',
  },
  // Text of location revealed
  title: {
    fontSize: 18,
    color: 'navy',
    fontWeight: 'bold',
    justifyContent: 'center',
    padding: 5,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 25,
    marginBottom: 30,
  },

  logo: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    // to the left:
    justifyContent: 'flex-start',
    padding: 60,
    resizeMode: 'contain',
    height: 50,
    width: 20,
    marginLeft: -20,
    marginTop: -40,
  },

  banner: {
    // flex: 1,
    // flexGrow: 1,
    justifyContent: 'center',
    padding: 80,
    // resizeMode: 'contain',
    height: 30,
    width: 5,
    marginLeft: 18,
    marginTop: -10,
  },

});

export default HomeScreen

import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const ChooseRoutes = ({ navigation }) => {
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
        // await SecureStore.setItemAsync('locationCounter', '0');
        const data = await response.json();
        await SecureStore.setItemAsync('token', data.token);
        setRoutes(data.routes);
      }
    };

    fetchData();
  }, []);

  // const handleBannerPress = (route) => {
  //   Alert.alert(
  //     route.name,
  //     route.bio,
  //     [
  //       {
  //         text: 'Go Back',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Take This Route',
  //         onPress: () => {
  //           navigation.navigate('LocationOneClues', { route });
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };

  const navDescription = () => {};

  const banner1 = require('../../images/area1-banner.png');
  const banner2 = require('../../images/area2-banner.png');
  const banner3 = require('../../images/area3-banner.png');

  return (
    <View>
      <ImageBackground
        source={require('../../images/background.png')}
        resizeMode="cover"
        style={styles.background}
      ></ImageBackground>

      {/* Solved Logo */}
      <View style={styles.logo}>
        <Image
          source={require('../../images/solved-logo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Choose the area you want to explore:</Text>

      {/* Area banner 1 - South Bank */}
      <View>
        {routes.map((routes) => {
          let imageSource;

          switch (routes.name) {
            case 'South Bank':
              imageSource = require('../../images/area1-banner.png');
              break;
            case 'City Of London':
              imageSource = require('../../images/area2-banner.png');
              break;
            case 'West End':
              imageSource = require('../../images/area3-banner.png');
              break;
            default:
              imageSource = null;
          }

          if (!imageSource) {
            return null; // skip this route if image source not found
          }

          return (
            <TouchableOpacity
              key={routes._id}
              style={styles.banner}
              onPress={() =>
                navigation.navigate('RouteDescription', { routes })
              }
            >
              <Image source={imageSource} style={styles.banner} />
            </TouchableOpacity>
          );
        })}
      </View>
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
    color: '#204376',
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

export default ChooseRoutes;

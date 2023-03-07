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
const RouteDescription = ({ route, navigation }) => {
  const { routes } = route.params;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../images/background.png')}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.TextViewStyle}>
          <Text style={styles.TextStyle}>{routes.name}</Text>
          <Text style={styles.TextStyle}>{routes.bio}</Text>
          <Text style={styles.TextStyle}>{routes.time}</Text>
          <Text style={styles.TextStyle}>{routes.start}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ChooseRoutes')}>
            <Image
              source={require('../../images/return-button.png')}
              style={styles.back}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('LocationOneClues', { routes })}
          >
            <Image
              source={require('../../images/go-button.png')}
              style={styles.go}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    resizeMode: 'contain',
    height: 170,
    width: 180,
    marginLeft: -5,
  },

  go: {
    resizeMode: 'contain',
    height: 170,
    width: 180,
    marginLeft: -5,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },

  buttonReady: {
    position: 'absolute',
    top: 475,
    right: 25,
  },
  buttonReturn: {
    position: 'absolute',
    top: 525,
    left: -30,
  },

  TextViewStyle: {
    position: 'absolute',
    top: 170,
    left: 35,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#000000',
    width: '80%',
    padding: 5,
    backgroundColor: '#FFFFFF',
  },

  TextStyle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#000',
    padding: 10,
  },
});

module.exports = RouteDescription;

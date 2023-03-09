import * as React from 'react';
import { useContext } from 'react';

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
import RunningScoreContext from '../landmarkCamera/RunningScoreContext';
const RouteDescription = ({ route, navigation }) => {
  const { routes } = route.params;
  const { setRunningScore, runningScore } = useContext(RunningScoreContext);

  () => {
    setRunningScore(0);
  };
  return (
    <View style={styles.page}>
      <ImageBackground
        source={require('../../images/background-landmarks.png')}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.TextViewStyle}>
          <Text style={styles.Title}>{routes.name}</Text>
          <Text style={styles.TextDescription}>{routes.bio}</Text>
          <Text style={styles.TextTime}>{routes.time}</Text>
          <Text
            style={styles.TextStartLocation}
          >{`Starting point: ${routes.start}.`}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ChooseRoutes')}>
            <Image
              source={require('../../images/return.png')}
              style={styles.returnButton}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('LocationOneClues', { routes })}
          >
            <Image
              source={require('../../images/start.png')}
              style={styles.startButton}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '101%',
    height: '104.5%',
  },

  // All Texts
  TextViewStyle: {
    position: 'absolute',
    bottom: 170,
    left: 20,
    borderRadius: 20,
    borderColor: '#000000',
    width: '90%',
    padding: 7,
    backgroundColor: '#FFFFFF',
  },
  Title: {
    fontSize: 23,
    textAlign: 'center',
    color: '#204376',
    padding: 10,
    fontWeight: 'bold',
  },
  TextDescription: {
    fontSize: 17,
    textAlign: 'justify',
    color: '#204376',
    padding: 10,
  },
  TextTime: {
    fontSize: 17,
    textAlign: 'justify',
    color: '#204376',
    padding: 10,
  },
  TextStartLocation: {
    fontSize: 18,
    textAlign: 'justify',
    color: '#204376',
    padding: 10,
    fontWeight: 'bold',
  },

  // buttons
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 485,
  },
  returnButton: {
    resizeMode: 'contain',
    height: 170,
    width: 180,
    marginLeft: -5,
  },
  startButton: {
    resizeMode: 'contain',
    height: 170,
    width: 180,
    marginLeft: -5,
  },
});

module.exports = RouteDescription;

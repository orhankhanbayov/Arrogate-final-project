import React, { useState, useEffect } from 'react';
import { useContext } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import RunningScoreContext from '../landmarkCamera/RunningScoreContext';
const CongratulationsNextClue = ({ navigation }) => {
  const { setRunningScore, runningScore } = useContext(RunningScoreContext);

  const [locationCounter1, setLocationCounter] = useState(0);

  useEffect(() => {
    const lte = async () => {
      let res = await SecureStore.getItemAsync('locationCounter');
      setLocationCounter((prev) => parseInt(res));
    };
    lte();
  }, []);

  useEffect(() => {
    const lte = async () => {
      let updatedLocationCounter = locationCounter1 + 1;
      await SecureStore.setItemAsync(
        'locationCounter',
        updatedLocationCounter.toString()
      );
    };
    lte();
  }, [locationCounter1]);

  const nextLocation = async () => {
    let render = false;
    navigation.navigate('LocationOneClues', { render, locationCounter1 });
  };

  const trip = () => {
    navigation.navigate('TripAdvisor');
  };

  return (
    <View style={styles.page}>
      <ImageBackground
        source={require('../../images/background-landmarks.png')}
        resizeMode="cover"
        style={styles.background}
      ></ImageBackground>

      <Text style={styles.title}>
        Congratulations, you solved Location {locationCounter1 + 1}
      </Text>

      <Image
        source={require('../../images/coin-template.png')}
        style={styles.image}
      />

      <View style={styles.area}>
        <Text style={styles.subtitle}> Add map here</Text>

        <TouchableOpacity onPress={trip}>
          <Image
            source={require('../../images/go-button.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={nextLocation}>
        <Image
          source={require('../../images/next-location-button.png')}
          style={styles.buttonImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // backgroundColor: '#EAF3F1',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '101%',
    height: '104.5%',
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
    fontSize: 20,
    color: '#204376',
    fontWeight: 'bold',
    textAlign: 'center',
    // padding: 5,
    // marginLeft: 50,
    // marginRight: 50,
    // marginTop: 20,
    // marginBottom: 0,
  },
  image: {
    resizeMode: 'contain',
    height: 280,
    width: 280,
    marginTop: -60,
    marginLeft: 60,
  },
  area: {
    fontWeight: 'bold',
    textAlign: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#204376',
    borderRadius: 25,
    padding: 50,
    marginLeft: 50,
    marginRight: 50,
  },
  buttonImage: {
    resizeMode: 'contain',
    height: 200,
    width: 200,
    marginLeft: 100,
    // marginTop will follow the area
    marginTop: 20,
  },
});

export default CongratulationsNextClue;

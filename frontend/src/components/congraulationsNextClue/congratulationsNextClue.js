import React, { useState, useEffect } from 'react';
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

const CongratulationsNextClue = ({ navigation }) => {
  const { name, locationCounter } = route.params;
  // Checking if they get passed
  console.log(`locationCounter: ${locationCounter}`)
  console.log(`name: ${name}`)

  const nextLocation = () => {
    let pass = false;
    navigation.navigate('LocationOneClues', { pass });
  };

  return (
    <View style={styles.page}>
      <ImageBackground
        source={require('../../images/background-landmarks.png')}
        resizeMode="cover"
        style={styles.background}
      ></ImageBackground>

      <Text style={styles.title}>{`Congratulations, you solved ${name}, location ${locationCounter + 1} of 5`}</Text>

      <Image
          source={require('../../images/coin-template.png')}
          style={styles.image}
      />

      <View style={styles.area}>
        <Text style={styles.subtitle}> Add map here</Text>
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

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
const CongratulationsNextClue = ({ route, navigation }) => {
  const { setRunningScore, runningScore } = useContext(RunningScoreContext);

  const [locationCounter1, setLocationCounter] = useState(0);
  const { scoreCounter } = route.params;
  const { name } = route.params;
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

  return (
    <View style={styles.page}>
      <ImageBackground
        source={require('../../images/background-landmarks.png')}
        resizeMode="cover"
        style={styles.background}
      ></ImageBackground>

      <View style={styles.titleContainer}>
        <Text style={styles.subTitle}>
          Congratulations, you solved Location {locationCounter1 + 1}
        </Text>
        <Text style={styles.title}>{name.name}</Text>
      </View>

      <View style={styles.coinsContainer}>
        <Text style={styles.scoreNumber}>{runningScore} </Text>
        <Image
          source={require('../../images/coin-cropped.png')}
          style={styles.imageCoin}
        />
      </View>

      {/* <TouchableOpacity onPress={}>       */}
        <Image
        source={require('../../images/explore-area.png')}
        style={styles.image}
        />
      {/* </TouchableOpacity> */}

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
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#EAF3F1',
  },
  coinsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EAF3F1',
    alignSelf: 'center',
    // width: 130,
    borderWidth: 2,
    borderColor: '#204376',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  scoreNumber: {
    resizeMode: 'contain',
    fontSize: 50,
    color: '#204376',
    fontWeight: 'bold',
    // backgroundColor: '#0000FF',
    // textAlign: 'left',
    // marginTop: -100,
    // padding: 5,
    // marginRight: 50,
    // marginTop: 20,
    // marginBottom: 0,
  },
  imageCoin: {
    resizeMode: 'contain',
    height: 80,
    width: 80,
    // backgroundColor: '#00FF00'
    // marginTop: -10,
    // marginLeft: 60,
  },
  titleContainer: {
    // flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    // marginTop: '25%',
    alignSelf: 'center',
    // backgroundColor: '#FF0000',
  },
  title: {
    fontSize: 38,
    color: '#204376',
    fontWeight: 'bold',
    textAlign: 'center',
    // padding: 5,
    // marginLeft: 50,
    // marginRight: 50,
    // marginTop: -10,
    // marginBottom: 30,
    // backgroundColor: '#00FF00',
  },
  subTitle: {
    fontSize: 20,
    color: '#204376',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    marginBottom: 1,
    // backgroundColor: '#0000FF',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '101%',
    height: '104.5%',
  },
  image: {
    resizeMode: 'contain',
    height: 300,
    width: 300,
    // marginTop: -60,
    // marginLeft: 50,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  // TO DELETE?
  // area: {
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   borderStyle: 'dashed',
  //   borderWidth: 1,
  //   borderColor: '#204376',
  //   borderRadius: 25,
  //   padding: 50,
  //   marginLeft: 50,
  //   marginRight: 50,
  // },
  buttonImage: {
    resizeMode: 'contain',
    height: 200,
    width: 200,
    marginLeft: 100,
    // marginTop will follow the area
    marginTop: -90,
  },
});

export default CongratulationsNextClue;

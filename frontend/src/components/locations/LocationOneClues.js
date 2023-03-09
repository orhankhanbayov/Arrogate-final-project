import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

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
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import RunningScoreContext from '../landmarkCamera/RunningScoreContext';

const LocationOneClues = ({ route, navigation }) => {
  const { render } = route.params;
  const { locationCounter1 } = route.params;
  const [showValue1, setShowValue1] = useState(false);
  const [showValue2, setShowValue2] = useState(false);
  const [showValue3, setShowValue3] = useState(false);
  const [showValue4, setShowValue4] = useState(false); // this is for the give up
  const [confirmedReveal, setConfirmedReveal] = useState(false);
  const [chosenRoutes, setChosenRoutes] = useState('');
  const [locationCounter, setLocationCounter] = useState(0);
  const [value, setValue] = useState(0);
  const [currentClue, setCurrentClue] = useState(0);
  const [scoreCounter, setScoreCounter] = useState(0);
  const { runningScore } = useContext(RunningScoreContext);

  const [isLocationCounterLoaded, setIsLocationCounterLoaded] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getLocationCounter = async () => {
      try {
        let counter = await SecureStore.getItemAsync('locationCounter');
        if (counter !== null) {
          setLocationCounter((prev) => parseInt(counter));
          setIsLocationCounterLoaded((prev) => true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLocationCounter();
  });

  useEffect(() => {
    setScoreCounter(0);
  }, [render]);

  const set = async () => {
    if (value === 0) {
      setChosenRoutes(route.params.routes);
      setValue(1);
    }
  };
  set();
  // const handleClue1 = () => {
  //   setShowValue1(true);
  //  };
  //  const handleClue2 = () => {
  //   setShowValue2(true);
  // };
  // const handleClue3 = () => {
  //   setShowValue3(true);
  // };

  const handleClue1 = () => {
    if (currentClue >= 0) {
      setCurrentClue(1);
      setScoreCounter(5);
    }
  };

  const handleClue2 = () => {
    if (currentClue >= 1) {
      setCurrentClue(2);
      setScoreCounter(3);
    }
  };

  const handleClue3 = () => {
    if (currentClue >= 2) {
      setCurrentClue(3);
      setScoreCounter(1);
    }
  };

  const handleClue4 = () => {
    setShowValue4(!showValue4);
    setConfirmedReveal(false);
    Alert.alert(
      'Please move to the location and submit it',
      '',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            setConfirmedReveal(true);
            setShowValue4(!showValue4);
            setScoreCounter(0);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const nextClue = () => {
    setShowValue1(false);
    setShowValue2(false);
    setShowValue3(false);
    setShowValue4(false);

    let name = chosenRoutes.locations[locationCounter];
    navigation.navigate('LandmarkCamera', {
      name,
      scoreCounter,
      locationCounter,
    });
  };
  if (isLocationCounterLoaded) {
    return (
      <View style={styles.page}>
        <ImageBackground
          source={require('../../images/background.png')}
          resizeMode="cover"
          style={styles.background}
        ></ImageBackground>

        
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>Location 🪙{scoreCounter}</Text>
          <Text style={styles.counterText}>Total 🪙 {runningScore}</Text>
        </View>

        {/* Area/Location banner */}

        <View style={styles.banner}>
          <Image
            source={
              chosenRoutes.name === 'South Bank'
                ? require('../../images/area1-banner.png')
                : chosenRoutes.name === 'City Of London'
                ? require('../../images/area2-banner.png')
                : require('../../images/area3-banner.png')
            }
            style={styles.banner}
          />
        </View>

        <View>
          <Text style={styles.header}>{`Location ${
            locationCounter + 1
          } of 5`}</Text>

          <Text style={styles.header2}>{render ? 'Please try again' : ''}</Text>
        </View>

        {/* First Clue ']' */}
        {currentClue >= 1 ? (
          <View style={styles.clueBorder}>
            <Text style={styles.cluesText}>
              {chosenRoutes.locations[locationCounter].clue1}
            </Text>
          </View>
        ) : (
          <View style={styles.buttonContainer1}>
            <TouchableOpacity onPress={handleClue1}>
              <Image
                source={require('../../images/get-first-clue-button.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Second Clue */}
        {currentClue >= 2 ? (
          <View style={styles.clueBorder}>
            <Text style={styles.cluesText}>
              {chosenRoutes.locations[locationCounter].clue2}
            </Text>
          </View>
        ) : (
          <View style={styles.buttonContainer2}>
            <TouchableOpacity onPress={handleClue2}>
              <Image
                source={require('../../images/get-second-clue-button.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Third Clue */}
        {currentClue >= 3 ? (
          <View style={styles.clueBorder}>
            <Text style={styles.cluesText}>
              {chosenRoutes.locations[locationCounter].clue3}
            </Text>
          </View>
        ) : (
          <View style={styles.buttonContainer3}>
            <TouchableOpacity onPress={handleClue3}>
              <Image
                source={require('../../images/get-third-clue-button.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* // submit location  */}
        <View style={styles.buttonLower}>
          <TouchableOpacity style={styles.button} onPress={nextClue}>
            <Image
              source={require('../../images/submit-location-button.png')}
              style={styles.submitLocation}
            />
          </TouchableOpacity>

          {/* give up */}
          {showValue4 && confirmedReveal ? (
            <View style={styles.yellowButton}>
              <ImageBackground
                source={require('../../images/yellow-button.png')}
                resizeMode="cover"
                style={styles.yellowButton}
              ></ImageBackground>

              <Text style={styles.textGiveUp}>
                {chosenRoutes.locations[locationCounter].name}
              </Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleClue4}>
              <Image
                source={require('../../images/give-up-button.png')}
                style={styles.giveUp}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  banner: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 70,
    resizeMode: 'contain',
    height: 50,
    width: 20,
    position: 'absolute',
    marginHorizontal: 15,
  },

  //counter
  counterContainer: {
    position: 'absolute',
    marginTop: 50,
  },
  counterText: {
    fontSize: 13,
    color: '#72838E',
    fontWeight: 'bold',
    marginLeft: 280,
    padding: 2,
    textAlign: 'right',
  },
  // Location _ of 5
  header: {
    fontSize: 22,
    flexDirection: 'column',
    color: '#204376',
    fontWeight: 'bold',
    marginTop: 150,
    marginLeft: 120,
    marginRight: 50,
  },

  // Please try again
  header2: {
    position: 'absolute',
    fontSize: 20,
    flexDirection: 'column',
    color: 'red',
    fontWeight: 'bold',
    marginTop: 520,
    marginLeft: 10,
    marginRight: 50,
  },

  // Text of all clues
  cluesText: {
    fontSize: 18,
    color: '#204376',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  clueBorder: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 25,
    backgroundColor: '#F3FAFA',
    marginVertical: 10,
    marginHorizontal: 25,
  },

  // get clues buttons images
  buttonContainer1: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    marginTop: 150,
    marginBottom: 10,
  },
  buttonContainer2: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    marginTop: 255,
    marginBottom: 10,
  },
  buttonContainer3: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    marginTop: 355,
    marginBottom: 10,
  },
  image: {
    alignItems: 'center',
    resizeMode: 'contain',
    height: 175,
    width: 200,
  },
  submitLocation: {
    resizeMode: 'contain',
    height: 170,
    width: 110,
    marginLeft: 15,
  },
  // red giveUp button
  giveUp: {
    resizeMode: 'contain',
    height: 150,
    width: 220,
    marginRight: 5,
    marginBottom: 10,
    marginLeft: 0,
  },

  yellowButton: {
    position: 'absolute',
    padding: 13,
    height: 140,
    width: 310,
    marginLeft: 45,
  },
  // Text of location revealed
  textGiveUp: {
    fontSize: 18,
    color: '#204376',
    fontWeight: 'bold',
    padding: 1,
    marginTop: 55,
    marginLeft: 90,
  },
  page: {
    flex: 1,
  },
  buttonLower: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginTop: 520,
    marginBottom: 10,
    marginHorizontal: 18,
  },
});

export default LocationOneClues;

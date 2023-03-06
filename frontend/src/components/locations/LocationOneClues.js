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
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const LocationOneClues = ({ route, navigation }) => {
  const { render } = route.params;
  const { pass } = route.params;

  const [showValue1, setShowValue1] = useState(false);
  const [showValue2, setShowValue2] = useState(false);
  const [showValue3, setShowValue3] = useState(false);
  const [showValue4, setShowValue4] = useState(false); // this is for the give up
  const [confirmedReveal, setConfirmedReveal] = useState(false);
  const [chosenRoutes, setChosenRoutes] = useState('');
  const [locationCounter, setLocationCounter] = useState(0);
  const [value, setValue] = useState(0);

  const set = () => {
    if (value === 0) {
      setChosenRoutes(route.params.route);
      setValue(1);
    }
  };

  set();

  useEffect(() => {
    if (pass === false) {
      setLocationCounter(locationCounter + 1);
    }
  }, [pass]);

  const handleClue1 = () => {
    setShowValue1(true);
  };

  const handleClue2 = () => {
    setShowValue2(true);
  };

  const handleClue3 = () => {
    setShowValue3(true);
  };

  const handleClue4 = () => {
    setShowValue4(!showValue4);
    setConfirmedReveal(false);
    Alert.alert(
      'Are you sure?',
      'You will get the location',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            setConfirmedReveal(true);
            setShowValue4(!showValue4);
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
    if (locationCounter === 4) {
      navigation.navigate('Finished');
    } else {
      let name = chosenRoutes.locations[locationCounter];
      navigation.navigate('LandmarkCamera', { name });
    }
  };

  return (
    <View style={styles.page}>
      <ImageBackground
        source={require('../../images/background.png')}
        resizeMode="cover"
        style={styles.background}
      ></ImageBackground>

      {/* Area/Location banner */}
      <View style={styles.banner}>
        <Image
          source={require('../../images/area1-banner.png')}
          style={styles.banner}
        />
      </View>
      
      <View>
        <Text style={styles.header}>{`Location ${locationCounter + 1} of 5`}</Text>
        <Text>{render ? 'Please try again' : ''}</Text>
      </View>

      {/* First Clue ']' */}
      {showValue1 ? (
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
      {showValue2 ? (
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
      {showValue3 ? (
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
          <View style={styles.giveUpBorder}>
          <Text style={styles.textGiveUp}>
            {chosenRoutes.locations[locationCounter].name}
          </Text></View>
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

  header: {
    fontSize: 22,
    flexDirection:'column',
    color: '#204376',
    fontWeight: 'bold',
    marginTop: 140,
    marginLeft: 120,
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
    marginVertical: 20,
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
    marginTop: 275,
    marginBottom: 10,
  },
  buttonContainer3: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    marginTop: 400,
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
    width: 180,
    marginLeft: -5,
  },
  giveUp: {
    resizeMode: 'contain',
    height: 170,
    width: 180,
    marginRight: 5,
    marginBottom: 10,
    marginLeft: 5,
  },
  giveUpBorder: {
    position: 'absolute',
    borderRadius: 25,
    backgroundColor: '#FFDE59',
    marginVertical: 55,
    // marginHorizontal: 150,
    marginLeft: 170,
    marginRight: 5,
  },
  // Text of location revealed
  textGiveUp: {
    fontSize: 18,
    color: '#204376',
    fontWeight: 'bold',
    padding: 20,
    marginLeft: 1,
    marginRight: 10,
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

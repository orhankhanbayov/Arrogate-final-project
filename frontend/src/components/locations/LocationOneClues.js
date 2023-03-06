import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
      'You will get your location',
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
      {/* Area/Location banner */}
      <View style={styles.banner}>
        <Image
          source={require('../../images/area1-banner.png')}
          style={styles.banner}
        />
      </View>
      <View>
        <Text>{render ? 'Please try again' : ''}</Text>
      </View>
      {/* First Clue ']' */}
      {showValue1 ? (
        <View>
          <Text style={styles.subtitle}>
            {chosenRoutes.locations[locationCounter].clue1}
          </Text>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
          style={styles.button} 
          onPress={handleClue1}
          testID="get-first-clue-button"
          >
            <Image
              source={require('../../images/get-first-clue-button.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Second Clue */}
      {showValue2 ? (
        <View>
          <Text style={styles.subtitle}>
            {chosenRoutes.locations[locationCounter].clue2}
          </Text>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
          style={styles.button} 
          onPress={handleClue2} 
          testID="get-second-clue-button"
          >
            <Image
              source={require('../../images/get-second-clue-button.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Third Clue */}
      {showValue3 ? (
        <View>
          <Text style={styles.subtitle}>
            {chosenRoutes.locations[locationCounter].clue3}
          </Text>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
          style={styles.button} 
          onPress={handleClue3}
          testID="get-third-clue-button"
          >
            <Image
              source={require('../../images/get-third-clue-button.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* // submit location  */}
      <View style={styles.buttonLower}>
        <TouchableOpacity 
        style={styles.button} 
        onPress={nextClue}
        testID="next-clue"
        >
          <Image
            source={require('../../images/submit-location-button.png')}
            style={styles.submitLocation}
          />

          {/* give up */}
        </TouchableOpacity>
        {showValue4 && confirmedReveal ? (
          <Text style={styles.title}>
            {chosenRoutes.locations[locationCounter].name}
          </Text>
        ) : (
          <TouchableOpacity 
          style={styles.button} 
          onPress={handleClue4}
          testID="give-up-button"
          >
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
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF3F1',
    padding: 8,
  },

  banner: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    // to the left:
    justifyContent: 'flex-start',
    padding: 60,
    resizeMode: 'contain',
    height: 50,
    width: 20,
    marginLeft: -10,
    marginTop: 10,
  },

  // Text of location revealed
  title: {
    fontSize: 20,
    color: 'navy',
    fontWeight: 'bold',
    // justifyContent: 'flex-end',
    padding: 20,
    marginLeft: 50,
    marginRight: 200,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: '#429494',
    backgroundColor: '#F3FAFA',
  },

  // Text of all clues
  subtitle: {
    fontSize: 14,
    color: 'black',
    justifyContent: 'flex-end',
    marginLeft: 50,
    marginRight: 50,
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#429494',
    backgroundColor: '#F3FAFA',
  },
  image: {
    resizeMode: 'contain',
    height: 120,
    width: 150,
  },
  submitLocation: {
    resizeMode: 'contain',
    height: 120,
    width: 150,
    marginLeft: 40,
  },
  giveUp: {
    resizeMode: 'contain',
    height: 120,
    width: 200,
  },
  page: {
    backgroundColor: '#C5DBD6',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonLower: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 120,
  },
  button: {
    margin: 0,
  },
});

export default LocationOneClues;

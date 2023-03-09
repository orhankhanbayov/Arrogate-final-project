import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const About = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <ImageBackground
        source={require('../../images/background.png')}
        resizeMode="cover"
        style={styles.background}
      ></ImageBackground>
    
          <View style={styles.rulesContainer}>
      <Text style={styles.rulesTitle}>Welcome to Solved!</Text>  
      <Text style={styles.rules}>The live-action treasure hunting game that leads you on an exciting tour of a city neighbourhood. In each Solved treasure hunt you will use your knowledge of the city to search for five secret landmarks. During your adventure you’ll win coins, get recommendations for local cafes and restaurants and learn some amazing facts!</Text>
      
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  rulesContainer: {
    top: 20,
    left: 40,
    borderRadius: 25,
    borderColor: '#FFFFFF',
    width: '80%',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  rulesTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'justify',
    color: '#204376',
    padding: 10,
  },
  rules: {
    fontSize: 20,
    textAlign: 'justify',
    color: '#204376',
    padding: 10,
  },

  // scoresTitle: {
  //   fontWeight: 'bold',
  //   fontSize: 20,
  //   textAlign: 'justify',
  //   color: '#204376',
  //   padding: 5,
  // },
  // scores: {
  //   fontSize: 20,
  //   textAlign: 'justify',
  //   color: '#204376',
  //   padding: 5,
  // },
});

export default About;

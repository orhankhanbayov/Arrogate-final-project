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
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Rules = ({ navigation }) => {
  return (  
    <View style={styles.page}>
      <ImageBackground
        source={require('../../images/background.png')}
        resizeMode="cover"
        style={styles.background}
      ></ImageBackground>
    
      <ScrollView>
      <View style={styles.rulesContainer}>
        <Text style={styles.rulesTitle}>How to play Solved:</Text>  
        <Text style={styles.rules}>🗺️ You will be given the choice of three Areas: South Bank, City of London and West End</Text>
        <Text style={styles.rules}>To win this game you will need to solve 5 challenges, one for each secret location</Text>
        <Text style={styles.rules}>✨ You will be given a starting point and a set of clues to find the first location.</Text>
        <Text style={styles.rules}>✨ At each location, you can obtain up to 3 clues, which will lead them to the next location.</Text> 
        <Text style={styles.rules}>✨ You cannot skip any locations.</Text>  
        <Text style={styles.rules}>✨ Remember, the goal of a treasure hunt is to have fun 😀</Text>

        <Text style={styles.scoresTitle}> Points:</Text>
        <Text style={styles.scores}>5 🪙 for getting at the correct location after seeing only one clue</Text>
        <Text style={styles.scores}>3 🪙 for getting at the correct location after seeing two clues</Text>  
        <Text style={styles.scores}>1 🪙 for getting at the correct location after seeing three clues</Text>  

        <Text style={styles.scores}> You will get 1 🏆 for solving the area's challenge</Text>
      </View>
      </ScrollView>
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

  scoresTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'justify',
    color: '#204376',
    padding: 5,
  },
  scores: {
    fontSize: 20,
    textAlign: 'justify',
    color: '#204376',
    padding: 5,
  },
});
export default Rules;

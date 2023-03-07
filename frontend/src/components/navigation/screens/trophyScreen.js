import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';

import {
  Image,
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const TrophyScreen = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <ImageBackground
        source={require('../../../images/background.png')}
        resizeMode="cover"
        style={styles.background}
      ></ImageBackground>
      
      <View style={styles.templatesContainer}>
      <Image
        source={require('../../../images/trophyandcoin-template.png')}
        style={styles.trophyAndCoinTemplate}
      ></Image>
      </View>

      <Text style={styles.header}>Welcome, _username_!</Text>
      <Text style={styles.currentTreasures}>Your current treasures are:</Text>
      <Text style={styles.rankings}>Rankings</Text>
      <Text style={styles.pointsTrophies}>? </Text>
      <Text style={styles.pointsCoins}>? </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  background: {
    flex: 1,
    zIndex: 0,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  // All text styles
  header: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'space-evenly',
    color: '#204376',
    fontWeight: 'bold',
    marginTop: 40,
    marginVertical: 10,
    marginHorizontal: 50,
  },
  currentTreasures: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'space-evenly',
    color: '#204376',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  rankings: {
    fontSize: 22,
    textAlign: 'center',
    justifyContent: 'space-evenly',
    color: '#204376',
    fontWeight: 'bold',
    marginVertical: 150,
  },
  pointsTrophies: {
    fontSize: 40,
    position: 'absolute',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    color: '#204376',
    fontWeight: 'bold',
    marginVertical: 155,
    marginHorizontal: 55,
  },
  pointsCoins: {
    fontSize: 40,
    position: 'absolute',
    justifyContent: 'space-evenly',
    zIndex: 50, 
    color: '#204376',
    fontWeight: 'bold',
    marginVertical: 155,
    marginHorizontal: 190,
    
  },
  // Images
  templatesContainer: {
    resizeMode: 'contain',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 10,
    marginLeft:10,
    marginRight:10,
  },
  trophyAndCoinTemplate: {
    flex: 1,
    zIndex: 1,
    flexGrow: 1,
    padding: 130,
    height: 50,
  },
});

export default TrophyScreen;

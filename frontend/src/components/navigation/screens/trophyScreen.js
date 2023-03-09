import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';

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
  const [scores, setScores] = useState([]);
  const [userScore, setUserScore] = useState([]);
  useEffect(() => {
    const scores = async () => {
      let token = await SecureStore.getItemAsync('token');
      let email = await SecureStore.getItemAsync('email');
      let response = await fetch(
        'https://mystery-route-backend.onrender.com/account',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setScores(data.score);
      const selectedScore = data.score.find((score) => score.email === email);
      setUserScore(selectedScore);
      console.log(response.status);
    };
    scores();
  }, []);
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

      <Text style={styles.header}>Welcome!</Text>
      <Text style={styles.currentTreasures}>Your current treasures are:</Text>
      <Text style={styles.rankingsTitle}>Top 10 Rankings:</Text>
      <Text style={styles.pointsTrophies}>
        {userScore.trophies}
      </Text>

      <Text style={styles.pointsCoins}>
        {userScore.coins}
      </Text>

      <View style={styles.usersRankingsContainer}>
        {scores.map((score) => {
          return (
            <Text style={styles.usersRankings} key={score._id}>
              👤 {score.name} {score.trophies} 🏆 {score.coins} 🪙
            </Text>
          );
        })}
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
    zIndex: -1
  },
  // Titles styles
  header: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'space-evenly',
    color: '#204376',
    fontWeight: 'bold',
    marginTop: 30,
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
  rankingsTitle: {
    fontSize: 22,
    textAlign: 'center',
    justifyContent: 'space-evenly',
    color: '#204376',
    fontWeight: 'bold',
    marginVertical: 120,
  },
  // Text your points
  pointsTrophies: {
    fontSize: 30,
    position: 'absolute',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    color: '#204376',
    fontWeight: 'bold',
    marginVertical: 125,
    padding: 10,
    marginLeft: 35,
  },
  pointsCoins: {
    fontSize: 30,
    position: 'absolute',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    color: '#204376',
    fontWeight: 'bold',
    marginVertical: 125,
    padding: 10,
    marginLeft: 205,
  },
  // All users
  usersRankingsContainer: {
    position: 'absolute',
    top: 260,
    left: 40,
    borderRadius: 25,
    borderColor: '#FFFFFF',
    width: '80%',
    backgroundColor: '#FFFFFF',
  },
  
  usersRankings: {
    fontSize: 18,
    textAlign: 'justify',
    color: '#204376',
    marginBottom: 8,
    marginLeft: 15, 
    marginTop: 10,
  },
  // Images
  templatesContainer: {
    resizeMode: 'contain',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    zIndex: 0,
  },
  trophyAndCoinTemplate: {
    flex: 1,
    flexGrow: 1,
    padding: 130,
    height: 50,
    zIndex: 0,
  },
});

export default TrophyScreen;

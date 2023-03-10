import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import RunningScoreContext from 'frontend/src/components/landmarkCamera/RunningScoreContext'; //////////////
import { useContext } from 'react';

const Finished = ({ navigation, route }) => {
  const { runningScore } = useContext(RunningScoreContext);
  useEffect(() => {
    const scores = async () => {
      let token = await SecureStore.getItemAsync('token');
      let email = await SecureStore.getItemAsync('email');
      let response = await fetch(
        'https://mystery-route-backend.onrender.com/account',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            trophies: 1,
            coins: runningScore,
          }),
        }
      );
      console.log(response.status);
      console.log(`running score from within mainblock ${runningScore}`);
    };
    scores();
  }, []);
  const trip = () => {
    navigation.navigate('TripAdvisor');
  };
  return (
    <View style={styles.page}>
      {/* <Text style={styles.title}>
        Congratulations, you have solved the challenge!
      </Text>
      <Text style={styles.titleWinnings}>
        You have won a total of...
      </Text> */}

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Congratulations, you have solved the challenge!
        </Text>
        {/* <Text style={styles.subTitle}>You have won a total of...</Text> */}
      </View>

      {/* <View style={styles.coinsContainer}>
        <Text style={styles.scoreNumber}>{`${runningScore} 🪙`}</Text>
        {/* <Image
          source={require('../../images/trophy.png')}
          style={styles.imageCoin}
        /> */}
      {/* </View>  */}

      <Text style={styles.trophyText}> 🏆 </Text>

      {/* <View style={styles.trophyContainer}>
        <Image
          source={require('../../images/trophy.png')}
          style={styles.imageCoin}
        />
      </View> */}

      {/* <View style={styles.container}>
        <Image
          source={require('../../images/coin.png')}
          style={styles.imageCoin}
        />
        <Text style={styles.scoreNumber}>{runningScore} </Text>
      </View> */}

      {/* <View style={styles.image}>
        <Image
          source={require('../../images/trophy.png')}
          style={styles.imageCoin}
        />
      </View> */}

      <Text style={styles.exploreArea}>Explore the area...</Text>

      <TouchableOpacity onPress={trip}>
        <Image
          source={require('../../images/explore-area.png')}
          style={styles.image}
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
    // alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EAF3F1',
    alignSelf: 'center',
    width: 130,
    height: 200,
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
  trophyContainer: {
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
  titleContainer: {
    // flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    alignSelf: 'center',
    // backgroundColor: '#FF0000',
  },
  trophyText: {
    fontSize: 150,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: -30,
    // marginBottom: 30,
    // backgroundColor: '#FF0000',
  },
  title: {
    fontSize: 34,
    color: '#204376',
    fontWeight: 'bold',
    textAlign: 'center',
    // padding: 5,
    // marginLeft: 50,
    // marginRight: 50,
    // marginTop: 20,
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
    marginTop: 1,
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
    marginTop: -60,
    // marginLeft: 50,
    // backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  exploreArea: {
    fontSize: 20,
    color: '#204376',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 100,
    marginBottom: 1,
    // backgroundColor: '#0000FF',
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
    marginTop: 0,
    marginBottom: 20,
  },
});

export default Finished;

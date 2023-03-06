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
import { NavigationContainer } from '@react-navigation/native';

const CongratulationsNextClue = ({ navigation }) => {
  const nextLocation = () => {
    let render = false;
    navigation.navigate('LocationOneClues', render);
  };

  return (
    <View>
      <Text>Congratulations next clue</Text>
      <TouchableOpacity onPress={nextLocation}>
        <Image source={require('../../images/go-button.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default CongratulationsNextClue;

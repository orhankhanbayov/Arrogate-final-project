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

const Finished = ({ navigation }) => {
  return (
    <View style={styles.page}>
      
      <Text style={styles.title}>Congratulations you have solved the challenge!</Text>
      
      <View style={styles.image}>
        <Image
          source={require('../../images/trophy.png')}
          style={styles.image}
        />
      </View>
      
    </View>
  );
};


const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#EAF3F1',
  },
  title: {
    fontSize: 20,
    color: '#204376',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    marginBottom: 30,
  },
  image: {
    resizeMode: 'contain',
    height: 280,
    width: 280,
    marginLeft: 27,
  },
});

export default Finished;

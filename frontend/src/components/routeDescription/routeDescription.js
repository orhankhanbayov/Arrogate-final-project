import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const RouteDescription = ({ route, navigation }) => {
  const { routes } = route.params;
  return (
    <View>
      <Text>"routes"</Text>
      <Text>{routes.name}</Text>
      <Text>{routes.bio}</Text>
      <Text>{routes.time}</Text>
      <Text>{routes.start}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('ChooseRoutes')}>
        <Image
          source={require('../../images/return-button.png')}
          style={styles.back}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('LocationOneClues', { routes })}
      >
        <Image
          source={require('../../images/go-button.png')}
          style={styles.go}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    resizeMode: 'contain',
    height: 170,
    width: 180,
    marginLeft: -5,
  },

  go: {
    resizeMode: 'contain',
    height: 170,
    width: 180,
    marginLeft: -5,
  },
});

module.exports = RouteDescription;

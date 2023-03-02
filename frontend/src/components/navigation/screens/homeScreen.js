import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';

let list = async () => {
  let token = await SecureStore.getItemAsync('token');

  let response = await fetch(
    'https://mystery-route-backend.onrender.com/routes',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.body;
};

list();

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Routes</Text>
    </View>
  );
};

export default HomeScreen;

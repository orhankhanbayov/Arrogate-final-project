import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import { useEffect } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const EditEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const update = async () => {
    let token = await SecureStore.getItemAsync('token');
    let email = await SecureStore.getItemAsync('email');
    let response = await fetch(
      'https://mystery-route-backend.onrender.com/account/edit',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newEmail: email,
          email: email,
        }),
      }
    );
    console.log(response.status);
  };

  return (
    <>
      <View>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={update}>
          <Image source={require('../../images/edit-email-button.png')} />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default EditEmail;

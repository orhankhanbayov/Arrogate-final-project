import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const EditPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');

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
          newPassword: password,
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
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={update}>
          <Image source={require('../../images/edit-password-button.png')} />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default EditPassword;

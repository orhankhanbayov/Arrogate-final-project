import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';
import { createStackNavigator } from '@react-navigation/stack';
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

const EditName = ({ navigation }) => {
  const [name, setName] = useState('');
  useEffect(() => {
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
            newName: name,
            email: email,
          }),
        }
      );
      console.log(response.status);
    };
    update();
  }, []);
  return (
    <>
      <View>
        <TextInput placeholder="Name" />
      </View>
    </>
  );
};
export default EditName;

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
    navigation.navigate('Settings');
    console.log(response.status);
  };

  return (
    <View style={styles.page}>
      <ImageBackground
        source={require('../../images/background.png')}
        resizeMode="cover"
        style={styles.background}
      ></ImageBackground>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
        style={styles.inputContainer}
      />
      <View style={styles.buttonContainer3}>
        <TouchableOpacity onPress={update}>
          <Image
            source={require('../../images/edit-password-button.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 50,
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  page: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttonContainer3: {
    marginLeft: 95,
  },
  image: {
    alignItems: 'center',
    resizeMode: 'contain',
    height: 175,
    width: 200,
  },
});
export default EditPassword;

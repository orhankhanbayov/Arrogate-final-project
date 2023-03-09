import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const Settings = ({ navigation }) => {
  handleLogout = async () => {
    await SecureStore.deleteItemAsync('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'LogIn' }],
    });
  };

  handleEmail = () => {
    navigation.navigate('EditEmail');
  };

  handleName = () => {
    navigation.navigate('EditName');
  };

  handlePassword = () => {
    navigation.navigate('EditPassword');
  };

  handleRules = () => {
    navigation.navigate('Rules');
  };

  handleAbout = () => {
    navigation.navigate('About');
  };

  return (
    <View style={styles.page}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={handleAbout}>
          <Text style={styles.title}>📄 About</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRules}>
          <Text style={styles.title}>📢 Rules</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleName}>
          <Text style={styles.title}>👤 Edit name</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEmail}>
          <Text style={styles.title}>📧 Edit email</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePassword}>
          <Text style={styles.title}>🔑 Edit password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
        <Image
          source={require('../../images/logout-button.png')}
          style={styles.logoutButton}
        />
      </TouchableOpacity>

      <ImageBackground
        // /src/components/navigation/screens/
        source={require('../../images/background.png')}
        resizeMode="cover"
        style={styles.background}
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  textContainer: {
    justifyContent: 'space-evenly',
    padding: 10,
    marginTop: 40,
  },
  title: {
    fontSize: 25,
    color: '#204376',
    textAlign: 'center',
    marginHorizontal: -10,
    marginVertical: 10,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#F3FAFA',
  },

  //loggout button
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  logoutButton: {
    resizeMode: 'contain',
    marginBottom: 10,
    height: 180,
    width: 180,
  },

  // background image
  background: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});

export default Settings;

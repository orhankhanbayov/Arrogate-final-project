import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';

import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const SettingsScreen = ({ navigation }) => {
  
  handleAboutPress = async () => {
    await SecureStore.deleteItemAsync('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'About' }],
    });
  };
  
  handleRulesPress = async () => {
    await SecureStore.deleteItemAsync('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Rules' }],
    });
  };

  handleEditNamePress = async () => {
    await SecureStore.deleteItemAsync('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Edit name' }],
    });
  };

  handleEditEmailPress = async () => {
    await SecureStore.deleteItemAsync('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Edit email' }],
    });
  };

  handleEditPasswordPress = async () => {
    await SecureStore.deleteItemAsync('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Edit password' }],
    });
  };

  handleEditPicturePress = async () => {
    await SecureStore.deleteItemAsync('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Edit picture' }],
    });
  };

  handleLogout = async () => {
    await SecureStore.deleteItemAsync('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'LogIn' }],
    });
  };

  return (
    <View style={styles.page}>
      
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={handleAboutPress}>
          <Text style={styles.title}>📄 About</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRulesPress}>
          <Text style={styles.title}>📢 Rules</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleEditNamePress}>
          <Text style={styles.title}>👤 Edit name</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleEditNamePress}>
          <Text style={styles.title}>📧 Edit email</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleEditNamePress}>
          <Text style={styles.title}>🔑 Edit password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEditPicturePress}>
          <Text style={styles.title}>📸 Edit picture</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
        <Image
          source={require('../../../images/logout-button.png')}
          style={styles.logoutButton}
        />
      </TouchableOpacity>

      <ImageBackground
      // /src/components/navigation/screens/
        source={require('../../../images/background.png')}
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

export default SettingsScreen;

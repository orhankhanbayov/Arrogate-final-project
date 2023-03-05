import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';

import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const SettingsScreen = ({ navigation }) => {
  handleLogout = async () => {
    await SecureStore.deleteItemAsync('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'LogIn' }],
    });
  };

  return (
    <View>
      <Text>Settings Screen</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Image
          source={require('../../../images/logout-button.png')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  image: {
    resizeMode: 'contain',
    height: 150,
    width: 150,
  },
});

export default SettingsScreen;

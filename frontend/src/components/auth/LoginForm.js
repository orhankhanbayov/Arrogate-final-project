import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const LogInForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'https://mystery-route-backend.onrender.com/tokens',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      console.log('the status:', response.status);
      if (response.status !== 200) {
        const responseJson = await response.json();
        const token = responseJson.token;
        await AsyncStorage.setItem('@storage_Key', token);

        navigation.navigate('mainContainer');
        console.log('success');
      } else {
        console.log('sign in not successful');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello there!</Text>
      <Text style={styles.subtitle}>Welcome to Solved!</Text>
      <Text style={styles.subtitle}>Login below</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        {/* {error != null ? <Text style={styles.error}>{error}</Text> : null} */}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Image
          source={require('../../images/login-button.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUpPress}>
        <Text>
          {' '}
          Don't have an account?<Text style={{ color: 'blue' }}> SignUp!</Text>
        </Text>
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

export default LogInForm;

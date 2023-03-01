import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignUpForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    fetch('/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, name: name})
    })
      .then(response => {
        console.log(response)
        if (response.status === 201) {
          navigation.navigate('Login')
        } else {
          navigation.navigate('SignUp')
        }
      })
  }

  const handleEmailChange = (value) => {
    setEmail(value)
  }

  const handlePasswordChange = (value) => {
    setPassword(value)
  }

  const handleNameChange = (value) => {
    setName(value)
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.siteTitle}>Solved</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signUpForm}>
        <View style={styles.boldLine} />
        <View style={styles.window}>
          <View style={styles.overlay} />
          <View style={styles.content}>
            <Text style={styles.welcome}>Hello there!</Text>
            <Text style={styles.subb}>Welcome to Acebook</Text>
            <Text style={styles.subtitle}>Please signup below</Text>
            <View style={styles.inputFields}>
              <TextInput
                placeholder='Name'
                style={styles.inputLine}
                value={name}
                onChangeText={handleNameChange}
              />
              <TextInput
                placeholder='Email'
                style={styles.inputLine}
                value={email}
                onChangeText={handleEmailChange}
              />
              <TextInput
                placeholder='Password'
                style={styles.inputLine}
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Create Account!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  siteTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  loginButton: {
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 5,
  }
})

export default SignUpForm;
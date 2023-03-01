import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignUpForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://mystery-route-backend.onrender.com/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password, name: name})
      });
      console.log(response.status)
      if (response.status == 201) {
        console.log('succes')
      } else {
        console.log('sign up not succesfull')
      }
    } catch (error) {
      console.error(error);
    }
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
        <Text style={styles.title}>Solved</Text>
      </View>

      <View style={styles.signUpForm}>
        <View style={styles.boldLine} />
        <View style={styles.window}>
          <View style={styles.overlay} />
          <View style={styles.content}>
            <Text style={styles.subtitle}>Welcome to Solved!</Text>
            <Text style={styles.subtitle}>Please signup below</Text>
            <View style={styles.inputFields}>
              <TextInput
                placeholder='Name'
                style={styles.input}
                value={name}
                onChangeText={handleNameChange}
                autoCapitalize="none"
              />
              <TextInput
                placeholder='Email'
                style={styles.input}
                value={email}
                onChangeText={handleEmailChange}
                autoCapitalize="none"
              />
              <TextInput
                placeholder='Password'
                style={styles.input}
                value={password}
                onChangeText={handlePasswordChange}
                autoCapitalize="none"
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
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // nav: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   backgroundColor: '#fff',
  //   paddingHorizontal: 20,
  //   paddingTop: 40,
  //   paddingBottom: 10,
  // },
})

export default SignUpForm;
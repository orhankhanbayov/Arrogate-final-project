import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogInForm from './src/components/auth/LoginForm';
import SignUpForm from './src/components/user/SignUpForm';

export default function App() {
  return (
    <View style={styles.container}>
   
     <LogInForm></LogInForm>
     <SignUpForm></SignUpForm>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

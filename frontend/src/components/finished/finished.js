import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';

const Finished = ({ navigation }) => {
  return (
    <View>
      <Text>Congratulations you have completed the route</Text>
    </View>
  );
};

export default Finished;

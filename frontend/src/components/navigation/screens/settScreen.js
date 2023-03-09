import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../../settings/settings';
import EditEmail from '../../editEmail/editEmail';
import EditPassword from '../../editPassword/editPassword';
import EditName from '../../editName/editName';
import Rules from '../../rules/rules';
import About from '../../about/about';
const Stack = createStackNavigator();
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const SetScreen = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="EditEmail" component={EditEmail} />
      <Stack.Screen name="EditPassword" component={EditPassword} />
      <Stack.Screen name="EditName" component={EditName} />
      <Stack.Screen name="Rules" component={Rules} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

export default SetScreen;

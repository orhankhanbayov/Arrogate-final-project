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

const EditEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');
  useEffect(() => {
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
            newEmail: email,
            email: email,
          }),
        }
      );
      console.log(response.status);
    };
    update();
  }, []);
  return (
    <>
      <View></View>
    </>
  );
};
export default EditEmail;

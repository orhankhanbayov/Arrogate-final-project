import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let token = await SecureStore.getItemAsync('token');

      if (token) {
        const response = await fetch(
          'https://mystery-route-backend.onrender.com/routes',
          {
            method: 'get',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setRoutes(data.routes[0]);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Routes</Text>
      <Text>{routes.name}</Text>
      <Text>{routes.bio}</Text>
      <Text>{routes.time}</Text>
    </View>
  );
};

export default HomeScreen;

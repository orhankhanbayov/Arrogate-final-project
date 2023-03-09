import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/homeScreen';
import SetScreen from './screens/settScreen';
import MapScreen from './screens/mapScreen';
import TrophyScreen from './screens/trophyScreen';

const homeName = 'Home';
const setName = 'Settings';
const mapName = 'Map';
const trophyName = 'Trophies';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === setName) {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (rn === mapName) {
            iconName = focused ? 'map' : 'map-outline';
          } else if (rn === trophyName) {
            iconName = focused ? 'trophy' : 'trophy-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={mapName} component={MapScreen} />
      <Tab.Screen name={trophyName} component={TrophyScreen} />
      <Tab.Screen name={setName} component={SetScreen} />
    </Tab.Navigator>
  );
};

export default MainContainer;

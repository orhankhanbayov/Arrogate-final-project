import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';


export default function GPSLocation() {
  const [location, setLocation] = useState();
  
  useEffect(() => {
    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log("Please grant location permissions");
            return;
          }
          
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        console.log("Location:");
        console.log(currentLocation);
    };
    getPermissions();
  }, []);

}

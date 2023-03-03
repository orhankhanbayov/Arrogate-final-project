import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { getDistance, getPreciseDistance  } from 'geolib';

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
        console.log(currentLocation.coords.latitude);
        console.log(currentLocation.coords.longitude);
        
        lat = currentLocation.coords.latitude;
        long = currentLocation.coords.longitude;
        
        console.log(lat, long)
        
        dis1 = getPreciseDistance(
            {latitude:lat, longitude:long}, // user's coords
            {latitude:51.519522, longitude: -0.033101}, // target location coord
        );
        console.log(dis1);

        if (dis1 > 50) {
          console.log("too far away!")
        } else {
          console.log("Congratulations, you found it!")
        }

    };
    getPermissions();
  
  }, []);

// if latitude and longitude = National Theatre latitude and longitude
// congratulations page
// if not equal returns to clues page (with bad luck message)



}

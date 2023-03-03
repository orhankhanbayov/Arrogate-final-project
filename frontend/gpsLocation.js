import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { getDistance, getPreciseDistance  } from 'geolib';

export default function GPSLocation() {
  const [location, setLocation] = useState();
  const [locationLat, setLocationLat] = useState();
  const [locationLong, setLocationLong] = useState();
  
  useEffect(() => {

    // const token = AsyncStorage.getItem("token")

    const getLocationCoords = async () => {
      try {
        const response = await fetch(
          'https://mystery-route-backend.onrender.com/routes',
          {
            method: 'get',
            headers: {
              //  Authorization: `Bearer ${token}`,
              "Content-Type": 'application/json',
            },
          }
        );
    
        if (!response.ok) {
          throw new Error(response.statusText);
        }
    
        const data = await response.json();

        // console.log(data.routes[0].locations[0].coordinates.coordinates) // the zeroes in here must be changed to reference the correct route number and location number
        const locationLat = data.routes[0].locations[0].coordinates.coordinates[0]
        const locationLong = data.routes[0].locations[0].coordinates.coordinates[1]
        // console.log(locationLat)
        // console.log(locationLong)

        setLocationLat(locationLat);
        setLocationLong(locationLong);

      } catch (error) {
        console.error(error);
      }
    };
    getLocationCoords()


    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return; 
      }
        
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      // console.log("Location:");
      // console.log(currentLocation);
      // console.log(currentLocation.coords.latitude);
      // console.log(currentLocation.coords.longitude);
      
      lat = currentLocation.coords.latitude;
      long = currentLocation.coords.longitude;
      
      // console.log(lat, long)
      
      dis1 = getPreciseDistance(
        {latitude:lat, longitude:long}, // user's coords
        {latitude:locationLat, longitude:locationLong}, // target location coord
      );
      // console.log(dis1);

      if (dis1 > 100) {
        console.log("Wrong place")
      } else if (dis1 > 50 && dis1 < 100) {
        console.log("Getting close!")
      } else {
        console.log("Congratulations, you found it!")
      }
    };
    getPermissions();
  
  }, []);
}


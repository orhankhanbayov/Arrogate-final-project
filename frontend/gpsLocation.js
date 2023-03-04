
// To get the code below to work I had to run the following lines in Terminal. 
// npm install geolib --save
// npx expo install expo-location
// npm install  // Not sure if this was necessary but did it for good luck.


import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { getPreciseDistance } from 'geolib';

export default function GPSLocation() {
  const [location, setLocation] = useState();
  const [locationLat, setLocationLat] = useState();
  const [locationLong, setLocationLong] = useState();

  useEffect(() => {
    const getSecretLocationCoords = async () => {
       //let token = await SecureStore.getItemAsync('token');// 
      try {
        const response = await fetch(
          'https://mystery-route-backend.onrender.com/routes',
          {
            method: 'get',
            headers: {
              "Content-Type": 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQwMjEyZGM2NWQyNWEwMDUwNzdmMGJkIiwiaWF0IjoxNjc3ODU3NjA3LCJleHAiOjE2Nzc4NTc4MDkyN30.v91inO02McQv2M6GO_ByRMXGBt3RIhqZX7M2-8UBa5k'
            // An existing token has been hardcoded here but needs to be adapted to current user.
              //Authorization: `Bearer ${token}`
            },
          }
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        // await SecureStore.setItemAsync('token', data.token);//
        const locationLat = data.routes[0].locations[0].coordinates.coordinates[0]; //latitude for The Shard hardcoded - this must be made dynamic
        const locationLong = data.routes[0].locations[0].coordinates.coordinates[1]; //longitute for The Shard hardcoded - this must be made dynamic
        setLocationLat(locationLat);
        setLocationLong(locationLong);
      } catch (error) {
        console.error(error);
      }
    };

    getSecretLocationCoords();

    // Get the user's location and calculate the distance to the secret location
    const getUserCoords = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      const lat = currentLocation.coords.latitude;
      const long = currentLocation.coords.longitude;

      const dis1 = getPreciseDistance(
        { latitude: lat, longitude: long }, // the user's coords
        { latitude: locationLat, longitude: locationLong }, // the secret location coords
      );

      return dis1;
    };

    getUserCoords().then((dis1) => {
      // Checks the distance and prints a message based on the distance. This should be changed to fit the alerts on the clues page.
      if (dis1 > 100) {
        console.log("Wrong place");
      } else if (dis1 > 50 && dis1 < 100) {
        console.log("Wrong place but getting close!");
      } else {
        console.log("Congratulations, you found it!");
      }
    });

  }, []);
}

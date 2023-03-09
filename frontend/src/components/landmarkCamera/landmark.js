import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import vision from 'react-cloud-vision-api';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import { getPreciseDistance } from 'geolib';
import { GOOGLE_API } from '@env';
import Config from 'react-native-config';
import RunningScoreContext from 'frontend/src/components/landmarkCamera/RunningScoreContext'; //////////////
import { useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

vision.init({ auth: `${GOOGLE_API}` });

export default function LandmarkCamera({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [location, setLocation] = useState();
  const { name, scoreCounter } = route.params;
  const { runningScore, setRunningScore } = useContext(RunningScoreContext); /////////////////////
  const { locationCounter } = route.params;
  const getUserCoords = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);

    const dis1 = getPreciseDistance(
      {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      }, // the user's coords
        
      // ------ ORIGINAL:
      // {
      //   latitude: name.coordinates.coordinates[0],
      //   longitude: name.coordinates.coordinates[1],
      // } // the secret location coords
      // ------ End ORIGINAL
      
      // ------- FIXME MARTA testing
      {
        latitude: 51.5543740, // To put my coords
        longitude: -0.1416847, // To put my coords
      } // ------- End FIXME MARTA testing 
    );
    if (dis1 < 50) {
      return true;
    } else {
      return false;
    }
  };

  const takePicture = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync(null);

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const req = new vision.Request({
        image: new vision.Image({
          base64: base64,
        }),
        features: [new vision.Feature('LANDMARK_DETECTION', 4)],
      });
      let response = await vision.annotate(req);
      let data = JSON.parse(JSON.stringify(response.responses));
      let close = await getUserCoords();
      if (
        (data[0].landmarkAnnotations?.length > 0 &&
          data[0].landmarkAnnotations[0].description === name.name) ||
        close
      ) {
        if (locationCounter === 4) {
          setRunningScore(runningScore + scoreCounter);
          navigation.navigate('Finished', { runningScore });
        } else {
          navigation.navigate('CongratulationsNextClue', { name });
          setRunningScore(runningScore + scoreCounter);
        }
      } else {
        let render = true;

        navigation.navigate('LocationOneClues', { render });
      }
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => setCamera(ref)}
        ratio={'1:1'}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => takePicture()}>
            <Text style={styles.text}> Take Picture </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    marginTop: -105,
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
});

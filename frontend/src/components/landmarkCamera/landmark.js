import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import vision from 'react-cloud-vision-api';
import * as FileSystem from 'expo-file-system';

vision.init({ auth: 'AIzaSyDjVEQ92HJFFPzfnj1LaB1EQmugY21AZ3E' });

export default function LandmarkCamera({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);

  const takePicture = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync(null);
      console.log(uri);

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const req = new vision.Request({
        image: new vision.Image({
          base64: base64,
        }),
        features: [new vision.Feature('LANDMARK_DETECTION', 4)],
      });

      let response = vision.annotate(req).then(
        (res) => {
          console.log(JSON.stringify(res.responses));
        },
        (e, a) => {
          console.log('Error: ', e);
        }
      );

      if (response[0].description === '') {
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

import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const ClueOne = ({ navigation }) => {

  const handleSubmitLocation = async () => {

  }

  return (
    <View style={styles.container}>
    <ImageBackground source={require('./images/background.png')} resizeMode='cover' style={styles.backgroundImage}>
      <Image
        style={{
        resizeMode: 'contain',
        height: 200,
        width: 200,
        alignSelf: 'center',
        position: 'absolute',
        top: '50%',
        marginTop: -340,
        }}

        source={require('./images/area1-banner.png')} >
      </Image>

      <View style={styles.TextViewStyle}>
        <Text style={styles.TextStyle}> 
          
        </Text>
      </View>  

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonReady, {alignSelf: 'center'}]}
          activeOpacity={0.5}
          onPress={() => this.onPress('start')}>
          <Image
            style={{
              resizeMode: 'contain',
              height: 200,
              width: 200,
            }}
            source={require('./images/ready-to-start-button.png')} 
          />    
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonReturn, {alignSelf: 'center'}]}
          activeOpacity={0.5}
          onPress={() => this.onPress('return')}>
          <Image
            style={{
              resizeMode: 'contain',
              height: 100,
              width: 200,
            }}
            source={require('./images/return-button.png')} 
          />      
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },

  buttonReady: {
    position: 'absolute',
    top: 475,
    right: 25,
  },

  buttonReturn: {
    position: 'absolute',
    top: 525,
    left: -30,
  },

  TextViewStyle: {
    position: 'absolute',
    top: 170, 
    left: 35, 
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#000000',
    width: '80%',
    padding: 5,
    backgroundColor: '#FFFFFF',
  },

  TextStyle: { 
    fontSize: 15,
    textAlign: 'center',
    color: '#000',
    padding: 10
  }
});


export default ClueOne;
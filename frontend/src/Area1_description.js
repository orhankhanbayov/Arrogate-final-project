import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View, ImageBackground} from 'react-native';


  class Area1 extends Component {
    onPress = () => {
      this.props.navigation.navigate('AnotherPage');
    };

  render() {
    return (

<View style={styles.container}>

  <ImageBackground source={require('./images/background.png')}     resizeMode='cover' style={styles.backgroundImage}>


    <View style={styles.TextViewStyle}>
      <Text style={styles.TextStyle}> This treasure hunt will take you on a tour of London's South Bank, a thriving entertainment and commercial district next to the River Thames, stretching from Blackfriars Bridge in the east to Westminster Bridge in the west. During the Middle Ages the area developed as a place of entertainment thanks its location outside the strict regulation of the City of London on the north bank. By the 19th Century it had become heavily industrialised but in 1951 the Festival of Britain redefined the area as a place for arts and entertainment and it is now home to a long list much-loved attractions. </Text>
    </View>  

    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.buttonReady, {alignSelf: 'center'}]}
        activeOpacity={0.5}
        onPress={this.onPress}>
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
        onPress={this.onPress}>
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
    top: 100,
    right: 30,
  },
  buttonReturn: {
    position: 'absolute',
    top: 148,
    left: -30,
  },
  

  TextViewStyle:
  {
     alignItems: 'flex-start',
     justifyContent: 'flex-start',
     borderWidth: 3, 
     borderRadius: 10,
     borderColor: '#000000',
     width: '80%',
     padding: 5,
     backgroundColor: '#FFFFFF',
     marginTop: 20,
     marginLeft: 20,

  },

  TextStyle:
  { 
      fontSize: 16,
      textAlign: 'center',
      color: '#000',
      padding: 10
  
  }


});

export default Area1;
import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, Image, Alert, useEffect} from 'react-native'

const LocationOneClues = () =>{

  const [showValue1, setShowValue1] = useState(false);
  const [showValue2, setShowValue2] = useState(false);
  const [showValue3, setShowValue3] = useState(false);
  const [showValue4, setShowValue4] = useState(false); // this is for the give up
  const [confirmedReveal, setConfirmedReveal] = useState(false);

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
        await SecureStore.setItemAsync('token', data.token);

        setRoutes(data.routes);
      }
    };

    fetchData();
  }, []);

  const handleClue1 = () => {
    setShowValue1(true)
  }

  const handleClue2 = () => {
    setShowValue2(true)
  }

  const handleClue3 = () => {
    setShowValue3(true)
  }

  const handleClue4 = () => {
    setShowValue4(!showValue4);
    setConfirmedReveal(false);
    Alert.alert(
      'Are you sure?',
      'You will get your location',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => {
          setConfirmedReveal(true);
          setShowValue4(!showValue4);
        } },
      ],
      { cancelable: false }
    );
  }

return (
  <View style={styles.page}>
    
    {/* Area/Location banner */}
    <View style={styles.banner}>
      <Image
        source={require('../../images/area1-banner.png')}
        style={styles.banner}
      />
    </View>

    {/* First Clue 'routes[0].location[0]' */}
    {showValue1 ? (
      <View>
        <Text style={styles.subtitle}>This building is home to a restaurant appropriately called ‘The View’.</Text>
        </View>
    ) : (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClue1}>
        <Image
          source={require('../../images/get-first-clue-button.png')}
          style={styles.image}
        />
        </TouchableOpacity>
        </View>
    )}

    {/* Second Clue */}
    {showValue2 ? (
      <View>
        <Text style={styles.subtitle}>During its construction a fox was discovered living on the 46th floor.</Text>
        </View>
    ) : (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClue2}>
        <Image
          source={require('../../images/get-second-clue-button.png')}
          style={styles.image}
        />
        </TouchableOpacity>
        </View>
    )}

    {/* Third Clue */}
    {showValue3 ? (
      <View>
        <Text style={styles.subtitle}>Standing 309.6 metres high, it is the tallest building in the United Kingdom, and the seventh-tallest building in Europe.</Text>
        </View>
    ) : (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClue3}>
        <Image
          source={require('../../images/get-third-clue-button.png')}
          style={styles.image}
        />
        </TouchableOpacity>
        </View>
    )}
<View>
    {/* Submit Location */}
    <View>
      <Image
        source={require('../../images/submit-location-button.png')}
        style={styles.submitLocation}
      />
    </View>

{/* Give up */}
    <View> 
      {showValue4 && confirmedReveal ? (
        // 'routes[0].location[0].name'
        <Text style={styles.title}>The Shard</Text>
      ) : (<TouchableOpacity style={styles.giveUp} onPress={handleClue4}>
        <Image
          source={require('../../images/give-up-button.png')}
          style={styles.giveUp}
          />
      </TouchableOpacity>) 
      }
      </View>
</View>
</View>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF3F1',
    padding: 8,
  },

  banner: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    // to the left:
    justifyContent: 'flex-start',
    padding: 60,
    resizeMode: 'contain',
    height: 50,
    width: 20,
    marginLeft: -10,
    marginTop: 10,
  },

  // Text of location revealed
  title: {
    fontSize: 20,
    color: 'navy',
    fontWeight: 'bold',
    // justifyContent: 'flex-end',
    padding: 20,
    marginLeft: 50,
    marginRight: 200,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: '#429494',
    backgroundColor: '#F3FAFA'
  },

  // Text of all clues
  subtitle: {
    fontSize: 14,
    color: 'black',
    justifyContent: 'flex-end',
    marginLeft: 50,
    marginRight: 50,
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#429494',
    backgroundColor: '#F3FAFA',
  },
  image: {
    resizeMode: 'contain',
    height: 120,
    width: 150,
  },
  submitLocation: {
    resizeMode: 'contain',
    height: 120,
    width: 150,
    marginLeft: 40,
  },
  giveUp: {
    resizeMode: 'contain',
    height: 120,
    width: 200,
    marginLeft: 100,
  },
  page: {
    backgroundColor: '#C5DBD6',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
  },
  lowerButtons: {
    flexDirection: 'row'
  }
});

export default LocationOneClues;

// ### IMPORT STATEMENTS ###

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// ### APP ###

const ItemDetails = ({ navigation, route }) => {

  // passes name and image data to this route
  const { image, name, location, notes } = route.params ?? {image: null, name: null, location: null, notes: null};

  // goes back to item list screen
  const goToList = () => {
    navigation.navigate('Item List');
  }

  // * JSX *
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: 'data:image/jpeg;base64,' + image }} />

      <Text style={styles.title}>
        {name}
      </Text>

      <Text style={styles.title}>
        {location}
      </Text>

      <Text style={styles.title}>
        {notes}
      </Text>

      <Button title="Go to Item List" 
              onPress={goToList}
      />

      <Button title="Console Log" 
              onPress={() => {console.log(name)}}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}
export default ItemDetails;

// ### STYLESHEET ###

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

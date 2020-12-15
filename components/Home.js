
// ### IMPORT STATEMENTS ###

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// ### APP ###

const Home = ({ navigation, route }) => {

  // goes back to item list screen
  const goToList = () => {
    navigation.navigate('Item List');
  }

  // * JSX *
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Home Screen
      </Text>

      <Button title="Go to Item List" 
              onPress={goToList}
      />

      <StatusBar style="auto" />
    </View>
  );
}
export default Home;

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

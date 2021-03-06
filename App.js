
// ### IMPORT STATEMENTS ###

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Alert, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './components/Home';
import ItemList from './components/ItemList';
import ItemDetails from './components/ItemDetails';

// * Navigator *
const Stack = createStackNavigator();

// ### APP ###

const App = () => {

  // * Permissions *
  const [cameraPermission, askForCameraPermission] = Permissions.usePermissions(Permissions.CAMERA, {ask: true});
  const [cameraRollPermission, askForCameraRollPermission] = Permissions.usePermissions(Permissions.CAMERA_ROLL, {ask: true});

  // * State Hook *
  const [items, setItems] = useState([
    { 
      image: null,
      name: "Name",
      location: "Location",
      notes: "Notes",
      date: "Date",
    }
  ]);

  // * Effect Hook *
  useEffect ( () => {
    if (items.length != 0)
    storeData(items);
  });

  // Stores data as JSON string
  const storeData = async (items) => {
    try {
      const json = JSON.stringify(items);
      await AsyncStorage.setItem('@items', json);
    }
    catch (e) {
      console.log(e)
    }
  }

  // clears all asyncstorage data
  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }  

  // returns all keys
  const getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }
  
    console.log(keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }

  // You can pick images from camera roll
  const pickPhoto = async () => {
    if (cameraRollPermission.status == 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true
      });
      if (result.base64) {
        const item = {
          image: result.base64,
          name: null,
          location: null,
          notes: null,
          date: null,
        }
        setItems([...items, item]);
      }
    }
    else {
      askForCameraRollPermission();
    }
  }

  // You can take a photo
  const takePhoto = async () => {
    if (cameraPermission.status == 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      if (result.uri) {
        if (cameraRollPermission.status == 'granted') {
          MediaLibrary.saveToLibraryAsync(result.uri);
          const item = {
            image: result.base64,
            name: null,
            location: null,
            notes: null,
            date: null,
          }
          setItems([...items, item]);
        }
      }

    }
    else {
      askForCameraPermission();
    }
  }

  // Deletes first item in the array
  const deleteFirstItem = async () => {
    console.log(items[0])

    items.splice(0, 1)
  }

  // * JSX *
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home}
        />

        <Stack.Screen 
          name="Item List" 
          component={ItemList} 
          options={{
            headerRight: () => (
              <View style={styles.buttons}>
                <Button
                  title="Array"
                  onPress={() => {console.log(items)}}
                />

                <Button 
                  title="Camera"
                  onPress={takePhoto}
                  buttonStyle={styles.libraryButton}
                />

                <Button 
                  title="Library"
                  onPress={pickPhoto}
                  buttonStyle={styles.libraryButton}
                />
              </View>
            )
          }}
        />

        <Stack.Screen 
          name="Item Details" 
          component={ItemDetails} 
          options={{
            headerRight: () => (
              <View style={styles.buttons}>
                <Button title="Delete"
                  onPress={deleteFirstItem}
                />
                
              </View>
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

// ### STYLESHEET ###

const styles = StyleSheet.create({
  buttons: {
    marginRight: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  libraryButton: {
    marginLeft: 5,
  }
})

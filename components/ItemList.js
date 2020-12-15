
// ### IMPORT STATEMENTS ###

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// ### APP ###

const ItemList = ({ route, navigation }) => {

  // * State Hook *
  const [items, setItems] = useState([]);

  // * Effect Hook *
  useEffect( () => {
    //console.log(items);
    getData();
  })

  // retrieves stored data if it exists
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@items');
      if (jsonValue != null) {
        setItems(JSON.parse(jsonValue))
      }
    }
    catch(e) {
      console.log(e);
    }
  }
  
  // Deletes specified item
  const deleteItem = async () => {
		try {
      await AsyncStorage.removeItem('@items')
    } catch(e) {
      // remove error
    }
    console.log('Done.')
  }

  // takes you to the details screen
  const goToDetails = (item) => {
    navigation.navigate('Item Details', {image: item.image, name: item.name, location: item.location, notes: item.notes});
  }

  // defines the cell that holds the image
  const itemCell = ( item, index ) => (
    <TouchableOpacity 
      style={styles.cell}
      onPress={() => goToDetails(item)}
      key={index}
    >
      <Image style={styles.image} source={{ uri: 'data:image/jpeg;base64,' + item.image }} />
    </TouchableOpacity>
  )

  // * JSX *
  return (
    <SafeAreaView style={styles.grid}>
      <ScrollView 
        contentContainerStyle={styles.grid}
        data={items}
      >
        {
          items.map( (item, index) => 
            itemCell(item, index)
          )
        }
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
export default ItemList;

// ### STYLESHEET ###

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  grid: {
    flex: 1,
    marginTop: 3,
    marginLeft: 3,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 24,
    marginLeft: 20,
  },
  cell: {
    width: 115,
    height: 115,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  image: {
    width: 110,
    height: 110,
  }
});

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemList = ({ route, navigation }) => {

  const [items, setItems] = useState([]);

  useEffect( () => {
    //console.log(items);
    getData();
  })

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

  const goToDetails = (item) => {
    navigation.navigate('Item Details', {name: item.name, image: item.image});
  }

  const itemCell = ( item, index ) => (
    <TouchableOpacity 
      style={styles.cell}
      onPress={() => goToDetails(item)}
      key={index}
    >
      <Image style={styles.image} source={{ uri: 'data:image/jpeg;base64,' + item.image }} />
    </TouchableOpacity>
  )

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

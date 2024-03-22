import { FlatList, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar, ListItem } from 'react-native-elements';
import HomeController from '../../../controllers/home_controller';

export const Home = () => {
  const Controller = new HomeController();
  const [assets, setAssets] = useState<AssetsModel[]>([]); // Initialize with an empty array

  async function getData() {
    try {
      const res = await Controller.Index(); // Aguarda a resolução da Promise
      setAssets(res);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('Details' as never);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const clearInput = () => setSearchQuery('');
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const styles = StyleSheet.create({
    balanceContainer: {
      backgroundColor: '#131a20',
      alignItems: 'center',
      justifyContent: 'center',
    },
    balanceTitle: {
      fontSize: 18,
      color: '#dde4eb',
    },
    balance: {
      padding: 40,
      fontSize: 32,
      color: '#dde4eb',
      fontWeight: 'bold',
    },
    searchContainer: {
      flexDirection: 'row',
      backgroundColor: '#131a20',
      alignItems: 'center',
      position: 'relative',
      padding: 10,
      marginBottom: 20
    },
    searchInput: {
      backgroundColor: '#1c2329',
      borderRadius: 20,
      fontSize: 16,
      color: '#dde4eb',
      flex: 1,
      paddingVertical: 10,
      paddingLeft: 15,
    },
    clearIcon: {
      position: 'absolute',
      right: 20,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  function convertNumb(value: string) {
    const valorFloat: number = parseFloat(value);
    return valorFloat.toFixed(2);
  }

  function isNegative(value: string): boolean {
    const num = parseFloat(value);
    return num < 0;
  }
  return (
    <>
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>R$ 1.234,56</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Buscar..."
          placeholderTextColor="#dde4eb"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearInput} style={styles.clearIcon}>
            <MaterialCommunityIcons name="close-circle" color={'#dde4eb'} size={25} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView>
        <FlatList
          data={assets}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleNavigate()}>
              <ListItem
                key={item.id}
                containerStyle={{ backgroundColor: '#1c2329', marginBottom: 10 }}
              >
                <Avatar
                  title={item.symbol}
                  overlayContainerStyle={{ color: 'dde4eb' }}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ color: '#dde4eb', fontWeight: 'bold' }}>{item.name}</ListItem.Title>
                  <ListItem.Subtitle style={{ color: '#eff1f3' }}>PM {convertNumb(item.vwap24Hr)} USD</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content style={{ alignItems: 'flex-end' }}>
                  <ListItem.Title style={{ color: '#fcffff' }}>{convertNumb(item.supply)} USD</ListItem.Title>
                  <ListItem.Subtitle style={{ color: isNegative(item.changePercent24Hr) ? '#b96065' : '#3bdd8a' }}>{convertNumb(item.changePercent24Hr)} %</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron style={{ color: '#3bdd8a' }} />
              </ListItem>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </>
  );

}


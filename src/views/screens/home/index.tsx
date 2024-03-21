import React, { useEffect, useState} from 'react';
import { TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { FlatList, ScrollView, Text, View } from 'native-base';

import HomeController from '../../../controllers/HomeController';
import { ListItem, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Home = () => {
  const controller = new HomeController();
  const [assets, setAssets] = useState<{ id: string, avatar: {initial: string, bgcolor: string}, title: string, subtitle: string, squareTitle: string, squareSubtitle: string }[]>([]); // Initialize with an empty array

  async function getData() {
    const response = await controller.Index();
    setAssets(response ?? []);
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
            <MaterialCommunityIcons name= "close-circle" color={'#dde4eb'} size={25}/>
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
                  title={item.avatar.initial}
                  overlayContainerStyle={{ backgroundColor: item.avatar.bgcolor, color:'dde4eb' }}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ color: '#dde4eb'}}>{item.title}</ListItem.Title>
                  <ListItem.Subtitle style={{ color: '#eff1f3'}}>{item.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content style={{ alignItems: 'flex-end'}}>
                  <ListItem.Title style={{ color: '#fcffff'}}>{item.squareTitle}</ListItem.Title>
                  <ListItem.Subtitle style={{ color: '#3bdd8a'}}>{item.squareSubtitle}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron style={{ color: '#3bdd8a'}} />
              </ListItem>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </>
  );
  
}


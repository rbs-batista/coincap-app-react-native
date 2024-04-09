import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, ScrollView, Text, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, TextInput, TouchableOpacity } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { Dialog, Loading, Util } from '../../../../helpers';
import styles from "./styles";
import { StoreModel } from '../../../../models/store_model';
import StoreController from '../../../../controllers/store_controller';
import { useFocusEffect } from '@react-navigation/native';

export const Index = ({ navigation }: { navigation: any }) => {

  const [stores, setStores] = useState<StoreModel[]>([]);
  const [filteredStores, setFilteredStores] = useState<StoreModel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      Loading.start();
      const res = await StoreController.index();
      console.log(`Store fetchData: ${JSON.stringify(res)}`);
      setFilteredStores(res);
      setStores(res);
      
      Loading.finished();
    } catch (err) {
      Loading.finished();
      Dialog.error({ message: 'Erro ao buscar dados' });
    }
  };

  useFocusEffect(useCallback(() => {fetchData()}, []));

  useEffect(() => {
    const results = stores.filter(store =>
      store.asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStores(results);

  }, [searchQuery, stores]);

  const handleNavigate = async () => {
    await navigation.navigate();
  };

  const clearInput = () => {
    Keyboard.dismiss();
    setSearchQuery('');
  }

  const handleBlur = () => Keyboard.dismiss();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          onBlur={handleBlur}
          placeholder="Buscar..."
          placeholderTextColor="#dde4eb"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearInput} style={styles.clearIcon}>
            <MaterialCommunityIcons name="close-circle" color={'#dde4eb'} size={25} />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={filteredStores}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNavigate()}>
            <ListItem
              key={item.asset.id}
              containerStyle={{ backgroundColor: '#1c2329', marginBottom: 10 }}
            >
              <Avatar
                title={item.asset.avatar}
                overlayContainerStyle={{
                  backgroundColor: Util.cryptoBackgroundColor({ symbol: item.asset.symbol }),
                  color: 'dde4eb'
                }}
                rounded
              />
              <ListItem.Content>
                <ListItem.Title style={{ color: '#dde4eb', fontWeight: 'bold' }}>{item.asset.name}</ListItem.Title>
                <ListItem.Subtitle style={{ color: '#eff1f3' }}>OF {item.asset.price}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content style={{ alignItems: 'flex-end' }}>
                <ListItem.Title style={{ color: '#fcffff' }}>{item.product.amount} BRL</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron style={{ color: '#3bdd8a' }} />
            </ListItem>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.asset.id}
      />
    </>
  );

}

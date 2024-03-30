import { FlatList, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, ListItem } from 'react-native-elements';
import AssetController from '../../../../controllers/asset_controller';
import { AssetModel } from '../../../../models';
import { Money } from '../../../../helpers';
import styles from "./styles";

export const List = () => {
  const [assets, setAssets] = useState<AssetModel[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<AssetModel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await AssetController.index();
            setFilteredAssets(res?? []);
            setAssets(res ?? []);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
      };

      fetchData();
  }, []);

  useEffect(() => {
    const results = assets.filter(asset =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAssets(results);
  }, [searchQuery, assets]);

  const handleNavigate = ({id} : {id: string}) => {};

  const clearInput = () => setSearchQuery('');
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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
          data={filteredAssets}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleNavigate({id: item.id})}>
              <ListItem
                key={item.id}
                containerStyle={{ backgroundColor: '#1c2329', marginBottom: 10 }}
              >
                <Avatar
                  title={item.avatar}
                  overlayContainerStyle={{ color: 'dde4eb' }}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ color: '#dde4eb', fontWeight: 'bold' }}>item.name</ListItem.Title>
                  <ListItem.Subtitle style={{ color: '#eff1f3' }}>item.supply USD</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content style={{ alignItems: 'flex-end' }}>
                  <ListItem.Title style={{ color: '#fcffff' }}>item.price USD</ListItem.Title>
                  <ListItem.Subtitle style={{ color: Money.isNegative({value: item.percent}) }}>item.percent %</ListItem.Subtitle>
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


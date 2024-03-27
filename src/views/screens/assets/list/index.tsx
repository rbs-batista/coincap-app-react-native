import { FlatList, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar, ListItem } from 'react-native-elements';
import AssetController from '../../../../controllers/asset_controller';
import { AssetModel } from '../../../../models';
import styles from "./styles";

export const List = () => {
  const Controller = new AssetController();
  const [assets, setAssets] = useState<AssetModel[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<AssetModel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  async function getData() {
    try {

      const res = await Controller.Index();
      setFilteredAssets(res);
      setAssets(res);

    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const results = assets.filter(asset =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAssets(results);
  }, [searchQuery, assets]);

  const navigation = useNavigation();

  const handleNavigate = ({id} : {id: string}) => {
    // navigation.navigate('Detail', {});
  };

  const clearInput = () => setSearchQuery('');
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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
                  <ListItem.Title style={{ color: '#dde4eb', fontWeight: 'bold' }}>{item.name}</ListItem.Title>
                  <ListItem.Subtitle style={{ color: '#eff1f3' }}>PM {convertNumb(item.supply)} USD</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content style={{ alignItems: 'flex-end' }}>
                  <ListItem.Title style={{ color: '#fcffff' }}>{convertNumb(item.price)} USD</ListItem.Title>
                  <ListItem.Subtitle style={{ color: isNegative(item.percent) ? '#b96065' : '#3bdd8a' }}>{convertNumb(item.percent)} %</ListItem.Subtitle>
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


import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Keyboard, TextInput, TouchableOpacity } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import AssetController from '../../../../controllers/asset_controller';
import BaasController from '../../../../controllers/baas_controller';
import { Dialog, Loading, Money, Util } from '../../../../helpers';
import { AssetModel, BalanceModel } from '../../../../models';
import styles from "./styles";

export const Index = ({ navigation }: { navigation: any }) => {
  const [balance, setBalance] = useState<BalanceModel | null>();
  const [assets, setAssets] = useState<AssetModel[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<AssetModel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        Loading.start();        
        const balance = await BaasController.balance();        
        const res = await AssetController.index();        
        setBalance(balance);
        setFilteredAssets(res);
        setAssets(res);
        Loading.finished();
      } catch (err) {
        Loading.finished();
        Dialog.error({ message: 'Erro ao buscar dados' });
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

  const handleNavigate = async ({ id }: { id: string }) => {
    await navigation.navigate('Details', { id: id });
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
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>{Money.formatCurrency({value: balance?.amount})}</Text>
      </View>
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
        data={filteredAssets}
        
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNavigate({ id: item.id })}>
            <ListItem
              key={item.id}
              containerStyle={{ backgroundColor: '#1c2329', marginBottom: 10 }}
            >
              <Avatar
                title={item.avatar}
                overlayContainerStyle={{
                  backgroundColor: Util.cryptoBackgroundColor({ symbol: item.symbol }),
                  color: 'dde4eb'
                }}
                rounded
              />
              <ListItem.Content>
                <ListItem.Title style={{ color: '#dde4eb', fontWeight: 'bold' }}>{item.name}</ListItem.Title>
                <ListItem.Subtitle style={{ color: '#eff1f3' }}>OF {item.supply}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content style={{ alignItems: 'flex-end' }}>
                <ListItem.Title style={{ color: '#fcffff' }}>{item.price} USD</ListItem.Title>
                <ListItem.Subtitle style={{ color: Util.isNegative({ value: item.percent }) }}>{item.percent} %</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron style={{ color: '#3bdd8a' }} />
            </ListItem>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );

}


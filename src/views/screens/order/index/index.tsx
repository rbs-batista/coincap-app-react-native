import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, ScrollView, Text, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, TextInput, TouchableOpacity } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { Dialog, Loading, Money, Util } from '../../../../helpers';
import styles from "./styles";
import { OrderModel } from '../../../../models';
import OrderController from '../../../../controllers/order_controller';
import { OrderTypeTranslate } from '../../../../enums';

export const Index = () => {

  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderModel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      
      Loading.start();
      const res = await OrderController.index();
      console.log(`Order fetchData: ${JSON.stringify(res)}`);
      setFilteredOrders(res);
      setOrders(res);
      
      Loading.finished();
    } catch (err) {
      Loading.finished();
      Dialog.error({ message: 'Erro ao buscar dados' });
    }
  };

  useEffect(() => {fetchData()}, []);

  useEffect(() => {
    const results = orders.filter(order =>
      order.assetName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(results);
  }, [searchQuery, orders]);

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
        data={filteredOrders}
        renderItem={({ item }) => (          
            <ListItem
              key={item.id}
              containerStyle={{ backgroundColor: '#1c2329', marginBottom: 10 }}
            >
              <ListItem.Content>
                <ListItem.Title style={{ color: '#dde4eb', fontWeight: 'bold' }}>{item.assetName}</ListItem.Title>
                <ListItem.Subtitle style={{ color: '#eff1f3' }}>{item.assetPercent} USD</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content style={{ alignItems: 'flex-end' }}>
                <ListItem.Title style={{ color: Util.isNegative({ value: item.amount }) }}>{Money.formatCurrency({value: item?.amount})}</ListItem.Title>
                <ListItem.Subtitle style={{ color: '#eff1f3' }}>{OrderTypeTranslate(item.type).toUpperCase()}</ListItem.Subtitle>
              </ListItem.Content>              
            </ListItem>          
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}

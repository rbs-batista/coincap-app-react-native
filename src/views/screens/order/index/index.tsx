import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Keyboard, TextInput, TouchableOpacity } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { Dialog, Loading, Util } from '../../../../helpers';
import styles from "./styles";
import { OrderModel } from '../../../../models';
import OrderController from '../../../../controllers/order_controller';

export const Index = ({ navigation }: { navigation: any }) => {

  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderModel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        Loading.start();
        const res = await OrderController.index();
        setFilteredOrders(res);
        setOrders(res);
        
        Loading.finished();
      } catch (err) {
        Loading.finished();
        Dialog.error({ message: 'Erro ao buscar dados' });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = orders.filter(order =>
      order.assetName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(results);

  }, [searchQuery, orders]);

  const handleNavigate = async ({ id }: { id: string }) => {
    await navigation.navigate('Ordens', { id: id });
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
      <ScrollView>
        <FlatList
          data={filteredOrders}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleNavigate({ id: item.id })}>
              <ListItem
                key={item.id}
                containerStyle={{ backgroundColor: '#1c2329', marginBottom: 10 }}
              >
                {/* <Avatar
                  title={item.}
                  overlayContainerStyle={{
                    backgroundColor: Util.cryptoBackgroundColor({ symbol: item.symbol }),
                    color: 'dde4eb'
                  }}
                  rounded
                /> */}
                <ListItem.Content>
                  <ListItem.Title style={{ color: '#dde4eb', fontWeight: 'bold' }}>{item.assetName}</ListItem.Title>
                  <ListItem.Subtitle style={{ color: '#eff1f3' }}>OF {item.assetPrice}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content style={{ alignItems: 'flex-end' }}>
                  <ListItem.Title style={{ color: '#fcffff' }}>{item.amount} USD</ListItem.Title>
                  <ListItem.Subtitle style={{ color: Util.isNegative({ value: item.assetPercent }) }}>{item.assetPercent} %</ListItem.Subtitle>
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

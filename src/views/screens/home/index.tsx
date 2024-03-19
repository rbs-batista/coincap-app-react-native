import React, { useEffect, useState} from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'native-base';

import HomeController from '../../../controllers/HomeController';
import { List } from '../../components/list';
import { ListItem, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Order } from '../order';


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
    navigation.navigate('Order' as never);
  };

  return (
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
      {/* <FlatList 
        data={assets}
        renderItem={({ item }) => <List name={item.name} />}
        keyExtractor={item => item.id.toString()}
      /> */}
    </ScrollView>
  );
}
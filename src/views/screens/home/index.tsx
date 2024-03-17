import React, { useEffect, useState} from 'react';
import { Container, FlatList, ScrollView } from 'native-base';
import HomeController from '../../../controllers/HomeController';
import { List } from '../../components/list';

export const Home = () => {
  const controller = new HomeController();
  const [assets, setAssets] = useState<{id: number, name: string}[]>([]); // Initialize with an empty array

  async function getData() {
    const response = await controller.Index();
    setAssets(response ?? []);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView>
      <FlatList 
        data={assets}
        renderItem={({ item }) => <List name={item.name} />}
        keyExtractor={item => item.id.toString()}
      />
    </ScrollView>
  );
}
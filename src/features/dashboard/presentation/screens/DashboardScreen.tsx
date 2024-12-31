import {
  Text,
  View,
  SafeAreaView,
  Button,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import {styles} from '../styles';

type CryptoItem = {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  subtitle: string;
  subprice: string;
};

const DATA = [
  {
    id: '1',
    imageUrl: '',
    title: 'title',
    price: 'price',
    subtitle: 'subtitle',
    subprice: 'subprice',
  },
  {
    id: '2',
    imageUrl: '',
    title: 'title1',
    price: 'price1',
    subtitle: 'subtitle1',
    subprice: 'subprice1',
  },
  {
    id: '3',
    imageUrl: '',
    title: 'title2',
    price: 'price2',
    subtitle: 'subtitle2',
    subprice: 'subprice2',
  },
];

const Item = ({title}: CryptoItem) => (
  <View style={{backgroundColor: '#ff0000', marginVertical: 8}}>
    <Text>{title}</Text>
  </View>
);

const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={() => <View style={styles.card}></View>}
          data={DATA}
          renderItem={({item}) => (
            <Item
              title={item.title}
              id={''}
              imageUrl={''}
              price={''}
              subtitle={''}
              subprice={''}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

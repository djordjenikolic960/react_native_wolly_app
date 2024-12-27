import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import {Images} from '../../assets';
import useCryptoListStore from './store';
import CryptoCurrency from '../../types/cryptocurrency';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Types';

type CryptoListNavigationProps = NavigationProp<RootStackParamList, 'Tabs'>;

type ItemProps = CryptoCurrency & {
  onPress: () => void;
};

const Item = ({
  iconUrl,
  name,
  abbrevation,
  valueOfOne,
  id,
  onPress,
}: ItemProps) => (
  <View style={{marginVertical: 8, flexDirection: 'row', alignItems: 'center'}}>
    <Image source={{uri: iconUrl}} style={{height: 56, width: 56}} />
    <View style={{width: 12}}></View>
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={styles.title}>{`${name} (${abbrevation.toUpperCase()})`}</Text>
      </View>
      <View style={{height: 4}}></View>
      <Text style={styles.subtitle}>{`$ ${valueOfOne.toString()}`}</Text>
    </View>
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={Images.icons.arrowRight}
          style={{width: 24, height: 24}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </View>
);

const CryptoListScreen = () => {
  const {cryptos, loading, fetchCryptoCurrencies} = useCryptoListStore();
  const navigation = useNavigation<CryptoListNavigationProps>();

  useEffect(() => {
    fetchCryptoCurrencies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={() => (
            <Text style={styles.header}>Add to your wallet</Text>
          )}
          data={cryptos}
          renderItem={({item}) => (
            <Item
              name={item.name}
              id={item.id}
              iconUrl={item.iconUrl}
              abbrevation={item.abbrevation}
              valueOfOne={item.valueOfOne}
              onPress={() => {
                navigation.navigate('Trading', {id: item.id});
              }}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default CryptoListScreen;

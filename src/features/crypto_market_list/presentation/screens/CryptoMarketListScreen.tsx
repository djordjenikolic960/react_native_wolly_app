import {FlatList, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../navigation/Types';
import {styles} from '../styles';
import useCryptoMarketListStore from '../store/CryptoMarketListStore';
import CryptoListItem from '../components/CryptoListItem';
import LoadingView from '../../../../components/loading/LoadingView';

type CryptoListNavigationProps = NavigationProp<RootStackParamList, 'Tabs'>;

const CryptoMarketListScreen = () => {
  const {cryptos, loading, fetchCryptoCurrencies} = useCryptoMarketListStore();
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
            <CryptoListItem
              name={item.name}
              id={item.id}
              icon={item.icon}
              abbreviation={item.abbreviation}
              valueOfOne={item.valueOfOne}
              onPress={() => {
                navigation.navigate('Trading', {id: item.id});
              }}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      {loading ? <LoadingView /> : <></>}
    </SafeAreaView>
  );
};

export default CryptoMarketListScreen;

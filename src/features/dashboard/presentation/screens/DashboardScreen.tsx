import {View, SafeAreaView, FlatList, Text} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from '../styles';
import useDashboardStore from '../store/DashboardStore';
import DashboardCryptocurrencyListItem from '../components/DashboardCryptocurrencyListItem';
import LoadingView from '../../../../components/loading/LoadingView';
import DashboardCard from '../components/DashboardCard';

const DashboardScreen = () => {
  const {wallet, loading, cryptoBalance, fetchWallet} = useDashboardStore();

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={() => (
            <DashboardCard cryptoBalance={cryptoBalance} />
          )}
          data={wallet?.cryptocurrencies}
          renderItem={({item}) => (
            <DashboardCryptocurrencyListItem
              name={item.name}
              abbreviation={item.abbreviation}
              cryptocurrencyId={item.cryptocurrencyId}
              icon={item.icon}
              sum={item.sum}
              valueOfOne={item.valueOfOne}
            />
          )}
          keyExtractor={item => item.cryptocurrencyId}
        />
      </View>
      {loading ? <LoadingView /> : <></>}
    </SafeAreaView>
  );
};

export default DashboardScreen;

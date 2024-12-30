import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import {Images} from '../../assets';
import CryptoCurrency from '../../types/cryptocurrency';
import useTradingStore from './store';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Types';

type TradingScreenRouteProp = RouteProp<RootStackParamList, 'Trading'>;

const TradingScreen = ({route}: {route: TradingScreenRouteProp}) => {
  const {id} = route.params;
  const {crypto, loading, fetchCryptoCurrencie} = useTradingStore();

  useEffect(() => {
    fetchCryptoCurrencie(id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Image
            source={{uri: crypto?.iconUrl}}
            style={{height: 110, width: 110}}
          />
          <Text
            style={styles.header}>{`$ ${crypto?.valueOfOne.toString()}`}</Text>

          <Text style={styles.subtitle}>{`1.00 ${crypto?.abbrevation}`}</Text>

          <View
            style={{
              width: '90%',
              borderColor: '#000',
              borderWidth: 1,
              height: 40,
            }}></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TradingScreen;

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Cryptocurrency} from '../../domain/model/Cryptocurrency';
import {styles} from '../styles';
import {Images} from '../../../../assets';

type ItemProps = Cryptocurrency & {
  onPress: () => void;
};

const CryptoListItem: React.FC<ItemProps> = ({
  icon,
  name,
  abbreviation,
  valueOfOne,
  id,
  onPress,
}) => {
  return (
    <View
      style={{marginVertical: 8, flexDirection: 'row', alignItems: 'center'}}>
      <Image source={{uri: icon}} style={{height: 56, width: 56}} />
      <View style={{width: 12}}></View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={
              styles.title
            }>{`${name} (${abbreviation.toUpperCase()})`}</Text>
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
};

export default CryptoListItem;

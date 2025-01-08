import {SafeAreaView, View} from 'react-native';
import React from 'react';
import CustomButton from '../../../components/custom_button/CustomButton';
import useSettingsStore from '../store/SettingsStore';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/Types';

type LoginNavigationProps = NavigationProp<RootStackParamList, 'Login'>;

const SettingsScreen = () => {
  const navigation = useNavigation<LoginNavigationProps>();
  const {logout} = useSettingsStore();
  return (
    <SafeAreaView
      style={{
        margin: 20,
      }}>
      <CustomButton
        onClick={async () => {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }}
        label={'Logout'}
      />
    </SafeAreaView>
  );
};

export default SettingsScreen;

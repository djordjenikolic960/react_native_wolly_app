import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import TokenManager from '../../utils/TokenManager';

const SettingsScreen = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={async () => {
          await TokenManager.deleteToken();
        }}>
        <Text>logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});

import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import {RootStackParamList} from './Types';
import TokenManager from '../utils/TokenManager';
import {ActivityIndicator, View} from 'react-native';
import LoginScreen from '../features/login/presentation/screens/LoginScreen';
import CreateAccountScreen from '../features/create_user/presentation/screens/CreateAccountScreen';
import TradingScreen from '../features/trading/presentation/screens/TradingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await TokenManager.getToken();
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    // Show a loading indicator while checking authentication
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'Tabs' : 'Login'}>
      <Stack.Screen
        name="Tabs"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Trading"
        component={TradingScreen}
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerStyle: {
            backgroundColor: '#4A7DDF',
          },
          headerTitleStyle: {
            color: '#fff',
            fontWeight: 'bold',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

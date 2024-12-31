import React from 'react';
import DashboardScreen from '../features/dashboard/presentation/screens/DashboardScreen';
import ProfileScreen from '../features/profile/Profile';
import SettingsScreen from '../features/settings/Settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomNavigationIcon from '../components/BottomNavigationIcon';
import {Images} from '../assets';
import {useTheme} from '../theme/ThemeProvider';
import CryptoMarketListScreen from '../features/crypto_market_list/presentation/screens/CryptoMarketListScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {theme} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        headerStyle: {
          backgroundColor: '#4A7DDF',
        },
        headerTitleStyle: {
          color: '#fff',
          fontWeight: 'bold',
        },
        tabBarStyle: {
          height: 100,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerTitle: 'Dashboard',
          tabBarIcon: ({color, focused}) => (
            <BottomNavigationIcon icon={Images.icons.dashboard} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CryptoList"
        component={CryptoMarketListScreen}
        options={{
          headerTitle: 'Crypto List',

          tabBarIcon: ({color, focused}) => (
            <BottomNavigationIcon
              icon={Images.icons.cryptoList}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <BottomNavigationIcon icon={Images.icons.profile} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <BottomNavigationIcon icon={Images.icons.settings} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

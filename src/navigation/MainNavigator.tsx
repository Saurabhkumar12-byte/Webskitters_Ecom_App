import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';
import ProductNavigator from './ProductNavigator';
import LogoutButton from '../components/Auth/LogoutButton';
import LogoutIcon from '../assets/icons/logout';
import ProductIcon from '../assets/icons/product';

const Tab = createBottomTabNavigator();

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconComponent;

        if (route.name === 'Products') {
          iconComponent = <ProductIcon />;
        } else if (route.name === 'Logout') {
          iconComponent = <LogoutIcon />;
        }

        return iconComponent;
      },
    })}
  >
    <Tab.Screen name="Products" component={ProductNavigator} />
    <Tab.Screen name="Logout" component={LogoutButton} />
  </Tab.Navigator>
);

export default MainNavigator;

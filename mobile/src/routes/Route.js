/* eslint-disable react/prop-types */
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '~/screens/Login';

import Home from '~/screens/Home';
import Profile from '~/screens/Profile';

export default function createRouter(isSigned = false) {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return !isSigned ? (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={Login} />
    </Stack.Navigator>
  ) : (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#7D40E7',
        inactiveTintColor: '#999',
        labelStyle: {
          fontWeight: 'bold',
        },
      }}
      headerMode="none"
    >
      <Tab.Screen
        name="Main"
        options={{
          title: 'Entregas',
          tabBarIcon: ({ color }) => (
            <Icon name="reorder-horizontal" size={24} color={color} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

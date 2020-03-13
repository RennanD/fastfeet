import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AppRoutes from './App.routes';

import Login from '~/screens/Login';

export default function Routes() {
  const signed = false;
  const { Navigator, Screen } = createStackNavigator();

  if (!signed) {
    return (
      <Navigator headerMode="none">
        <Screen name="Login" component={Login} />
      </Navigator>
    );
  }
}

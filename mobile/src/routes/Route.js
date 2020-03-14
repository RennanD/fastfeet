import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Login from '~/screens/Login';
import Home from '~/screens/Home';

export default function createRouter(isSigned = false) {
  const { Navigator, Screen } = createStackNavigator();

  return !isSigned ? (
    <Navigator headerMode="none">
      <Screen name="SignIn" component={Login} />
    </Navigator>
  ) : (
    <Navigator headerMode="none">
      <Screen name="Main" component={Home} />
    </Navigator>
  );
}

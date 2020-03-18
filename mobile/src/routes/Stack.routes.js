import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '~/screens/Home';
import Details from '~/screens/OrderDetails';

export default function StackRoutes() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode="none">
      <Screen name="Home" component={Home} />
      <Screen name="Details" component={Details} />
    </Navigator>
  );
}

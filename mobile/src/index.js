import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

export default function src() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fafafa" barStyle="dark-content" />
      <Routes />
    </NavigationContainer>
  );
}

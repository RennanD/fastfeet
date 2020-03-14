import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';
import './config/reactotronConfig';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

import { store, persistor } from './store';

export default function src() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar backgroundColor="#fafafa" barStyle="dark-content" />
          <Routes />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

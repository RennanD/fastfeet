import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar, YellowBox } from 'react-native';
import './config/reactotronConfig';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

import { store, persistor } from './store';

YellowBox.ignoreWarnings(['componentWillReceiveProps', 'Failed prop type']);

export default function src() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <Routes />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

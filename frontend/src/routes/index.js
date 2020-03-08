import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SingIn from '~/pages/SingIn';

import Orders from '~/pages/Orders';

import Deliverymen from '~/pages/Deliverymen';
import NewDeliveryman from '~/pages/Deliverymen/Add';
import EditDeliveryman from '~/pages/Deliverymen/Edit';

import Recipients from '~/pages/Recipients';
import NewRecipient from '~/pages/Recipients/Add';
import EditRecipient from '~/pages/Recipients/Edit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />

      <Route path="/orders" component={Orders} isPrivate />

      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />
      <Route path="/deliverymen/new" component={NewDeliveryman} isPrivate />
      <Route path="/deliverymen/edit" component={EditDeliveryman} isPrivate />

      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/recipients/new" exact component={NewRecipient} isPrivate />
      <Route path="/recipients/edit" component={EditRecipient} isPrivate />
    </Switch>
  );
}

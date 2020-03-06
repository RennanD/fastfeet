import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SingIn from '~/pages/SingIn';

import Orders from '~/pages/Orders';

import Deliverymen from '~/pages/Deliverymen';
import NewDeliveryman from '~/pages/NewDeliveryman';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />

      <Route path="/orders" component={Orders} isPrivate />

      <Route path="/deliverymen" component={Deliverymen} isPrivate />
      <Route path="/new-deliverymen" component={NewDeliveryman} isPrivate />
    </Switch>
  );
}

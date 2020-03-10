import { combineReducers } from 'redux';

import auth from './auth/reducer';
import deliveryman from './deliveryman/reducer';
import recipient from './recipient/reducer';
import order from './order/reducer';

const reducers = combineReducers({
  auth,
  deliveryman,
  recipient,
  order,
});

export default reducers;

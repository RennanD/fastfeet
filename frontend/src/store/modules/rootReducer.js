import { combineReducers } from 'redux';

import auth from './auth/reducer';
import deliveryman from './deliveryman/reducer';
import recipient from './recipient/reducer';

const reducers = combineReducers({
  auth,
  deliveryman,
  recipient,
});

export default reducers;

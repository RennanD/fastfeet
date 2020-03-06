import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import deliveryman from './deliveryman/sagas';
import recipient from './recipient/sagas';

export default function* rootSaga() {
  yield all([auth, deliveryman, recipient]);
}

import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';
import { singInSuccess } from './actions';

export function* singIn({ payload }) {
  const { id } = payload;

  const response = yield api.get(`/deliverymen/${id}`);
  console.tron.log(response);
  yield put(singInSuccess('id', 'profile'));
}

export default all([takeLatest('@auth/SING_IN_REQUEST', singIn)]);

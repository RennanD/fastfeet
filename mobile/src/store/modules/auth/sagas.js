import { all, takeLatest, call, put } from 'redux-saga/effects';
import Snackbar from 'react-native-snackbar';

import api from '~/services/api';
import { singInSuccess, singFailure } from './actions';

export function* singIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/deliverymen/${id}`);

    yield put(singInSuccess(response.data.id, response.data));
  } catch ({ response }) {
    yield put(singFailure());
    Snackbar.show({
      text: response.data.error,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#E74040',
    });
  }
}

export default all([takeLatest('@auth/SING_IN_REQUEST', singIn)]);

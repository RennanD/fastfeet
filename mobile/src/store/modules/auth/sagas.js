import { Keyboard } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import Snackbar from 'react-native-snackbar';

import api from '~/services/api';
import { singInSuccess, singFailure } from './actions';

import formatDate from '~/utils/formatDate';

export function* singIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/deliverymen/${id}`);

    const data = {
      ...response.data,
      registeredDate: formatDate(response.data.created_at),
    };

    yield put(singInSuccess(data.id, data));
  } catch ({ response }) {
    Keyboard.dismiss();
    yield put(singFailure());
    Snackbar.show({
      text: response.data.error,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: '#E74040',
    });
  }
}

export default all([takeLatest('@auth/SING_IN_REQUEST', singIn)]);

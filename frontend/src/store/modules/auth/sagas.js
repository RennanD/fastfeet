import { all, call, takeLatest, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { singInSuccess, singFailure } from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* singIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    yield put(singInSuccess(user, token));
    history.push('/orders');
  } catch ({ response }) {
    toast.error(response.data.error);
    yield put(singFailure());
  }
}

export default all([takeLatest('@auth/SING_IN_REQUEST', singIn)]);

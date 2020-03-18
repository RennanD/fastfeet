import { all, takeLatest, call, put } from 'redux-saga/effects';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Snackbar from 'react-native-snackbar';

import api from '~/services/api';
import { singInSuccess, singFailure } from './actions';

export function* singIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/deliverymen/${id}`);

    const data = {
      ...response.data,
      registeredDate: format(parseISO(response.data.created_at), 'dd/MM/yyyy', {
        locale: ptBR,
      }),
    };

    yield put(singInSuccess(data.id, data));
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

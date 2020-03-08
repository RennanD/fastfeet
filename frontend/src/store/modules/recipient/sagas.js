import { all, takeLatest, call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import {
  showRecipientSuccess,
  recipientFailure,
  updateRecipientSuccess,
} from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* showRecipient({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, `/recipients/${id}`);

    yield put(showRecipientSuccess(response.data));
    history.push('/recipients/edit');
  } catch ({ response }) {
    toast.error(response.data.error);
    yield put(recipientFailure());
  }
}

export function* updateRecipipent({ payload }) {
  const { id, data } = payload;

  try {
    yield call(api.put, `/recipients/${id}`, data);

    yield put(updateRecipientSuccess());
    toast.success('Update recipient successful');
    history.push('/recipients');
  } catch ({ response }) {
    yield put(recipientFailure());
    toast.error(response.data.error);
  }
}

export default all([
  takeLatest('@recipient/SHOW_REQUEST', showRecipient),
  takeLatest('@recipient/UPDATE_REQUEST', updateRecipipent),
]);

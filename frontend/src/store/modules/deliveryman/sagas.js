import { all, takeLatest, call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  showDeliverymanSuccess,
  showDeliverymanFailure,
  updateDeliverymanSuccess,
  updateDeliverymanFailure,
} from './actions';
import history from '~/services/history';

export function* showDeliveryman({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, `/deliverymen/${id}`);

    yield put(showDeliverymanSuccess(response.data));

    history.push('/deliverymen/edit');
  } catch ({ response }) {
    yield put(showDeliverymanFailure());
    toast.error(response.data.error);
  }
}

export function* updateDeliveryman({ payload }) {
  const { id, name, email, avatar_id } = payload.data;

  try {
    yield call(api.put, `/deliverymen/${id}`, {
      name,
      email,
      avatar_id,
    });

    yield put(updateDeliverymanSuccess());

    toast.success('Update deliveryman successful');
    history.push('/deliverymen');
  } catch ({ response }) {
    yield put(updateDeliverymanFailure());
    toast.error(response.data.error);
  }
}

export default all([
  takeLatest('@deliveryman/SHOW_REQUEST', showDeliveryman),
  takeLatest('@deliveryman/UPDATE_REQUEST', updateDeliveryman),
]);

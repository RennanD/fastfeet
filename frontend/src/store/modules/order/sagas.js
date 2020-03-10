import { all, takeLatest, call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '~/services/api';

import { showOrderSuccess, updateOrderSuccess, orderFailure } from './actions';
import history from '~/services/history';

export function* showOrder({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, `/orders/${id}`);

    const data = {
      id: response.data.id,
      recipient: {
        value: response.data.recipient_id,
        label: response.data.recipient.name,
      },
      deliveryman: {
        value: response.data.deliveryman_id,
        label: response.data.deliveryman.name,
      },
      product: response.data.product,
    };

    yield put(showOrderSuccess(data));

    history.push('/orders/edit');
  } catch ({ response }) {
    yield put(orderFailure());

    toast.error(response.data.error);
  }
}

export function* updateOrder({ payload }) {
  const { id, data } = payload;

  try {
    yield call(api.put, `/orders/${id}`, data);

    yield put(updateOrderSuccess());

    toast.success('Update order successful');
    history.push('/orders');
  } catch ({ response }) {
    yield put(orderFailure());
    toast.error(response.data.error);
  }
}

export default all([
  takeLatest('@order/SHOW_REQUEST', showOrder),
  takeLatest('@order/UPDATE_REQUEST', updateOrder),
]);

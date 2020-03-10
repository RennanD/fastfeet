import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as Yup from 'yup';

import OrderForm from '~/components/OrderForm';
import { updateOrderRequest } from '~/store/modules/order/actions';

export default function EditOrder() {
  const schema = Yup.object().shape({
    recipient_id: Yup.number().required('Informe o detinatário'),
    deliveryman_id: Yup.number().required('Informe o entregador'),
    product: Yup.number().required('O produto é obrigatório'),
  });
  const details = useSelector(state => state.order.details);

  const dispatch = useDispatch();

  function handleSubmit(data) {
    console.log(details.id);

    dispatch(updateOrderRequest(details.id, data));
  }

  return (
    <OrderForm onSubmit={handleSubmit} schema={schema} initialData={details} />
  );
}

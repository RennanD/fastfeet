import React from 'react';
import { useDispatch } from 'react-redux';

import * as Yup from 'yup';

import DeliverymanForm from '~/components/DeliverymanForm';

import { addDeliverymanRequest } from '~/store/modules/deliveryman/actions';

export default function Add() {
  const schema = Yup.object().shape({
    avatar_id: Yup.number(),
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é obrigatório'),
  });

  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(addDeliverymanRequest(data));
  }

  return <DeliverymanForm onSubmit={handleSubmit} schema={schema} />;
}

import React from 'react';

import * as Yup from 'yup';

import { toast } from 'react-toastify';

import DeliverymanForm from '~/components/DeliverymanForm';

import api from '~/services/api';
import history from '~/services/history';

export default function Add() {
  const schema = Yup.object().shape({
    avatar_id: Yup.number(),
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é obrigatório'),
  });

  async function handleSubmit(data) {
    try {
      await api.post('/deliverymen', data);

      toast.success('Deliveryman registered successful');
      history.push('/deliverymen');
    } catch ({ response }) {
      toast.error(response.data.error);
    }
  }

  return (
    <DeliverymanForm
      title="Cadastro de entregadores"
      onSubmit={handleSubmit}
      schema={schema}
    />
  );
}

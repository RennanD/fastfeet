import React from 'react';

import * as Yup from 'yup';

import { toast } from 'react-toastify';

import OrderForm from '~/components/OrderForm';

import api from '~/services/api';
import history from '~/services/history';

export default function AddOrder() {
  const schema = Yup.object().shape({
    recipient_id: Yup.number().required('Informe o detinatário'),
    deliveryman_id: Yup.number().required('Informe o entregador'),
    product: Yup.number().required('O produto é obrigatório'),
  });

  async function handleSubmit({ recipient_id, deliveryman_id, product }) {
    try {
      await api.post(`/orders/${deliveryman_id}`, {
        recipient_id,
        product,
      });
      toast.success('Order created successful');
      history.push('/orders');
    } catch ({ response }) {
      toast.error(response.data.error);
    }
  }

  return (
    <OrderForm
      title="Cadastro de encomendas"
      schema={schema}
      onSubmit={handleSubmit}
    />
  );
}

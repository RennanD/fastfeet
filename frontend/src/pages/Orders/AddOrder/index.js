import React from 'react';

import { toast } from 'react-toastify';

import OrderForm from '~/components/OrderForm';

import api from '~/services/api';
import history from '~/services/history';

export default function AddOrder() {
  async function handleSubmit({ recipient, deliveryman, product }) {
    try {
      await api.post(`/orders/${deliveryman.value}`, {
        recipient_id: recipient.value,
        product,
      });
      toast.success('Order created successful');
      history.push('/orders');
    } catch ({ response }) {
      toast.error(response.data.error);
    }
  }

  return <OrderForm title="Cadastro de encomendas" onSubmit={handleSubmit} />;
}

import React, { useRef } from 'react';

import * as Yup from 'yup';

import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import OrderForm from '~/components/OrderForm';

import api from '~/services/api';
import history from '~/services/history';

export default function AddOrder() {
  const formRef = useRef();

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        recipient_id: Yup.string().required('Informe o detinatário'),
        deliveryman_id: Yup.string().required('Informe o entregador'),
        product: Yup.string().required('O produto é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { deliveryman_id, recipient_id, product } = data;

      await api.post(`/orders/${deliveryman_id}`, {
        recipient_id,
        product,
      });
      toast.success('Order created successful');
      history.push('/orders');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMesseges = {};

        err.inner.forEach(error => {
          errorMesseges[error.path] = error.message;
        });

        formRef.current.setErrors(errorMesseges);
      } else {
        const { response } = err;

        toast.error(response.data.error);
      }
    }
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <OrderForm title="Cadastro de encomendas" />
    </Form>
  );
}

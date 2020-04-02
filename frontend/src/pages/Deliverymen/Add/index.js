import React, { useRef } from 'react';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import DeliverymanForm from '~/components/DeliverymanForm';

import api from '~/services/api';
import history from '~/services/history';

export default function Add() {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    const schema = Yup.object().shape({
      avatar_id: Yup.number(),
      name: Yup.string().required('O nome é obrigatório'),
      email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });
      await api.post('/deliverymen', data);

      toast.success('Deliveryman registered successful');
      history.push('/deliverymen');
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
      <DeliverymanForm title="Cadastro de entregadores" />
    </Form>
  );
}

import React, { useRef } from 'react';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import RecipientForm from '~/components/RecipientForm';
import api from '~/services/api';
import history from '~/services/history';

export default function AddRecipient() {
  const formRef = useRef();

  async function handleSubmit(data) {
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório'),
      street: Yup.string().required('A rua é obrigatória'),
      number: Yup.string().required('O número é obrigatório'),
      city: Yup.string().required('A cidade é obrigatória'),
      region: Yup.string().required('O estado é obrigatório'),
      zipcode: Yup.string().required('O CEP é obrigatório'),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });
      await api.post('/recipients', data);
      toast.success('Recipient registered successful');
      history.push('/recipients');
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
      <RecipientForm title="Cadastro de destinatários" />
    </Form>
  );
}

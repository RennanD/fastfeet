import React from 'react';

import * as Yup from 'yup';

import { toast } from 'react-toastify';

import RecipientForm from '~/components/RecipientForm';
import api from '~/services/api';
import history from '~/services/history';

export default function AddRecipient() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    street: Yup.string().required('A rua é obrigatória'),
    number: Yup.string().required('O número é obrigatório'),
    complement: Yup.string(),
    city: Yup.string().required('A cidade é obrigatória'),
    region: Yup.string().required('O estado é obrigatório'),
    zipcode: Yup.string().required('O CEP é obrigatório'),
  });

  async function handleSubmit(data) {
    try {
      await api.post('/recipients', data);
      toast.success('Recipient registered successful');
      history.push('/recipients');
    } catch ({ response }) {
      toast.error(response.data.error);
    }
  }

  return (
    <RecipientForm
      title="Cadastro de destinatários"
      onSubmit={handleSubmit}
      schema={schema}
    />
  );
}

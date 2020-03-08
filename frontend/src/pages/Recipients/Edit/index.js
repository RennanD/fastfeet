import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as Yup from 'yup';

import RecipientForm from '~/components/RecipientForm';
import { updateRecipientRequest } from '~/store/modules/recipient/actions';

export default function EditRecipient() {
  const profile = useSelector(state => state.recipient.profile);

  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    street: Yup.string().required('A rua é obrigatória'),
    number: Yup.string().required('O número é obrigatório'),
    complement: Yup.string(),
    city: Yup.string().required('A cidade é obrigatória'),
    region: Yup.string().required('O estado é obrigatório'),
    zipcode: Yup.string().required('O CEP é obrigatório'),
  });

  function handleSubmit(data) {
    dispatch(updateRecipientRequest(profile.id, data));
  }

  return (
    <RecipientForm
      title="Edição de destinatários"
      onSubmit={handleSubmit}
      schema={schema}
      initialData={profile}
    />
  );
}

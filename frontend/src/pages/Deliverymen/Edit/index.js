import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as Yup from 'yup';

import DeliverymanForm from '~/components/DeliverymanForm';
import { updateDeliverymanRequest } from '~/store/modules/deliveryman/actions';

export default function Edit() {
  const profile = useSelector(state => state.deliveryman.profile);

  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    avatar_id: Yup.number(),
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é obrigatório'),
  });

  function handleSubmit({ name, email, avatar_id }) {
    const data = {
      id: profile.id,
      name,
      email,
      avatar_id,
    };

    dispatch(updateDeliverymanRequest(data));
  }

  return (
    <DeliverymanForm
      title="Edição de entregadores"
      onSubmit={handleSubmit}
      initialData={profile}
      schema={schema}
    />
  );
}

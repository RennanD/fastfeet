import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import DeliverymanForm from '~/components/DeliverymanForm';
import { updateDeliverymanRequest } from '~/store/modules/deliveryman/actions';

export default function Edit() {
  const profile = useSelector(state => state.deliveryman.profile);
  const dispatch = useDispatch();

  const formRef = useRef();

  async function handleSubmit({ name, email, avatar_id }) {
    const schema = Yup.object().shape({
      avatar_id: Yup.number(),
      name: Yup.string().required('O nome é obrigatório'),
      email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
    });
    try {
      const data = {
        id: profile.id,
        name,
        email,
        avatar_id,
      };

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(updateDeliverymanRequest(data));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMesseges = {};

        err.inner.forEach(error => {
          errorMesseges[error.path] = error.message;
        });

        formRef.current.setErrors(errorMesseges);
      }
    }
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit} initialData={profile}>
      <DeliverymanForm title="Edição de entregadores" />
    </Form>
  );
}

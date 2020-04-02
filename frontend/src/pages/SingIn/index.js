import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import Input from '~/components/Input';

import logo from '~/assets/logo.svg';
import { singInRequest } from '~/store/modules/auth/actions';

export default function SingIn() {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const formRef = useRef();

  async function handleSubmit({ email, password }) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
      password: Yup.string().required('A senha é obrigatória'),
    });

    try {
      await schema.validate(
        { email, password },
        {
          abortEarly: false,
        }
      );
      dispatch(singInRequest(email, password));
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
    <>
      <img src={logo} alt="FastFeet" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="email"
          label="SEU E-MAIL"
          type="email"
          placeholder="exemplo@fastfeet.com"
        />

        <Input
          name="password"
          type="password"
          label="SUA SENHA"
          placeholder="********"
        />

        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
      </Form>
    </>
  );
}

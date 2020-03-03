import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';
import { singInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SingIn() {
  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(singInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form onSubmit={handleSubmit} schema={schema}>
        <strong>SEU E-MAIL</strong>
        <Input name="email" type="email" placeholder="exemplo@fastfeet.com" />

        <strong>SUA SENHA</strong>
        <Input name="password" type="password" placeholder="********" />

        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
      </Form>
    </>
  );
}

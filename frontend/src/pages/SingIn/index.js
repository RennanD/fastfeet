import React from 'react';

import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

export default function SingIn() {
  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form>
        <strong>SEU E-MAIL</strong>
        <Input name="email" type="email" placeholder="exemplo@fastfeet.com" />

        <strong>SUA SENHA</strong>
        <Input name="password" type="password" placeholder="********" />

        <button type="submit">Acessar</button>
      </Form>
    </>
  );
}

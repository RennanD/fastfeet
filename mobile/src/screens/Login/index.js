import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import { Form } from '@unform/mobile';

import { Container, Logo, SubmitButton, LoginForm } from './styles';

import Input from '~/components/Input';
import Button from '~/components/Button';

import logo from '~/assets/mobile-logo.png';

export default function Login() {
  return (
    <>
      <StatusBar backgroundColor="#7D40E7" barStyle="light-content" />

      <Container>
        <Logo source={logo} />
        <Form>
          <Input name="input" />
          <SubmitButton>Entrar no sistema</SubmitButton>
        </Form>
      </Container>
    </>
  );
}

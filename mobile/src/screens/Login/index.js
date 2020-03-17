import 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'react-native';

import { Form } from '@unform/mobile';

import { Container, Logo, SubmitButton } from './styles';

import Input from '~/components/Input';

import logo from '~/assets/mobile-logo.png';

import { singInRequest } from '~/store/modules/auth/actions';

export default function Login() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  function handleSubmit({ user_id }) {
    dispatch(singInRequest(Number(user_id)));
  }

  return (
    <>
      <StatusBar backgroundColor="#7D40E7" barStyle="light-content" />

      <Container>
        <Logo source={logo} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="user_id" keyboardType="number-pad" type="email" />

          <SubmitButton onPress={() => formRef.current.submitForm()}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </>
  );
}

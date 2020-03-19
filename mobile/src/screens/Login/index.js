import 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';

import { Form } from '@unform/mobile';

import { Container, Logo, SubmitButton } from './styles';

import Input from '~/components/Input';

import logo from '~/assets/mobile-logo.png';

import { singInRequest } from '~/store/modules/auth/actions';

export default function Login() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ user_id }) {
    dispatch(singInRequest(user_id));
  }

  return (
    <>
      <StatusBar backgroundColor="#7D40E7" barStyle="light-content" />

      <Container>
        <Logo source={logo} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="user_id" keyboardType="number-pad" type="email" />

          <SubmitButton
            loading={loading}
            onPress={() => formRef.current.submitForm()}
          >
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </>
  );
}

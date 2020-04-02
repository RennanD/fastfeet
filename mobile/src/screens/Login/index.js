import 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';

import * as Yup from 'yup';
import { Form } from '@unform/mobile';

import { Container, Logo, SubmitButton } from './styles';

import Input from '~/components/Input';

import logo from '~/assets/mobile-logo.png';

import { singInRequest } from '~/store/modules/auth/actions';

export default function Login() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit({ user_id }) {
    const schema = Yup.object().shape({
      user_id: Yup.string().required('Digite seu ID para continuar.'),
    });

    try {
      await schema.validate({ user_id });
      dispatch(singInRequest(user_id));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMesseges = {};

        err.errors.forEach(error => {
          errorMesseges.user_id = error;
        });

        formRef.current.setErrors(errorMesseges);
      }
    }
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

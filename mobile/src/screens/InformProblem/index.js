import React, { useState, useRef } from 'react';
import SnackBar from 'react-native-snackbar';

import * as Yup from 'yup';
import { Form } from '@unform/mobile';

import { useNavigation } from '@react-navigation/native';

import PropTypes from 'prop-types';

import { Container, Content, SumbitButton } from './styles';

import Header from '~/components/Header';
import TextArea from '~/components/TextArea';
import api from '~/services/api';

export default function InformProblem({ route }) {
  const formRef = useRef(null);

  const { goBack } = useNavigation();

  const [loading, setLoading] = useState(false);

  async function handleSubmit({ description }) {
    const { order_id } = route.params;
    const schema = Yup.object().shape({
      description: Yup.string().required(
        'Adicione uma descrição para o problema.'
      ),
    });
    try {
      await schema.validate({ description });

      setLoading(true);

      await api.post(`/delivery/${order_id}/problems`, {
        description,
      });

      SnackBar.show({
        text: 'Problem registed successful',
        backgroundColor: '#2CA42B',
      });

      setLoading(false);

      goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMesseges = {};

        err.errors.forEach(error => {
          errorMesseges.description = error;
        });

        formRef.current.setErrors(errorMesseges);
      } else {
        const { response } = err;

        SnackBar.show({
          text: response.data.error,
          backgroundColor: '#DE3B3B',
        });

        setLoading(false);
      }
    }
  }

  return (
    <Container>
      <Header title="Informar problema" />
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <TextArea name="description" />
          <SumbitButton
            onPress={() => formRef.current.submitForm()}
            loading={loading}
          >
            Enviar
          </SumbitButton>
        </Form>
      </Content>
    </Container>
  );
}

InformProblem.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      order_id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

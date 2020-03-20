import React, { useState, useRef } from 'react';
import { Form } from '@unform/mobile';
import SnackBar from 'react-native-snackbar';

import PropTypes from 'prop-types';

import { Container, Content, SumbitButton } from './styles';

import Header from '~/components/Header';
import TextArea from '~/components/TextArea';
import api from '~/services/api';

export default function InformProblem({ route }) {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  async function handleSubmit({ description }) {
    const { order_id } = route.params;
    try {
      setLoading(true);
      await api.post(`/delivery/${order_id}/problems`, {
        description,
      });
      SnackBar.show({
        text: 'Problem registed successful',
        backgroundColor: '#2CA42B',
      });
      setLoading(false);
    } catch ({ response }) {
      SnackBar.show({
        text: response.data.error,
        backgroundColor: '#DE3B3B',
      });
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header />
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

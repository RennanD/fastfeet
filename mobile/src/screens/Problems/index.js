import React, { useEffect, useState } from 'react';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import PropTypes from 'prop-types';

import {
  Container,
  Content,
  Title,
  ListProblems,
  Card,
  Problem,
  DateText,
} from './styles';

import Header from '~/components/Header';
import api from '~/services/api';

export default function Problems({ route }) {
  const [problems, setProblems] = useState([]);

  const { order_id, product } = route.params;

  useEffect(() => {
    async function loadingProblems() {
      const response = await api.get(`/delivery/${order_id}/problems`);

      const data = response.data.map(problem => ({
        ...problem,
        dateFormated: format(parseISO(problem.created_at), 'dd/MM/yyyy', {
          locale: ptBR,
        }),
      }));

      setProblems(data);
    }
    loadingProblems();
  }, [order_id]);

  return (
    <Container>
      <Header title="Vizualizar probelmas" />

      <Content>
        <Title>{product}</Title>
        <ListProblems
          data={problems}
          keyExtractor={problem => String(problem.id)}
          renderItem={({ item }) => (
            <Card>
              <Problem>{item.description}</Problem>
              <DateText>{item.dateFormated}</DateText>
            </Card>
          )}
        />
      </Content>
    </Container>
  );
}

Problems.propTypes = {
  route: PropTypes.shape().isRequired,
};

import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import {
  Container,
  Content,
  Title,
  ListProblems,
  Card,
  Problem,
  DateText,
  ShimmerProblem,
  ShimmerCard,
  ShimmerDate,
} from './styles';

import Header from '~/components/Header';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import formatDate from '~/utils/formatDate';

export default function Problems({ route }) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState([]);

  const { order_id, product } = route.params;

  useEffect(() => {
    async function loadingProblems() {
      setLoading(true);
      const response = await api.get(`/delivery/${order_id}/problems`);

      const data = response.data.map(problem => ({
        ...problem,
        dateFormated: formatDate(problem.created_at),
      }));

      setLoading(false);
      setProblems(data);
    }
    loadingProblems();
  }, [order_id]);

  return (
    <Container>
      <Header title="Vizualizar probelmas" />

      <Content>
        <Title>{product}</Title>
        {loading ? (
          <>
            <ShimmerCard>
              <ShimmerProblem autoRun />
              <ShimmerDate autoRun />
            </ShimmerCard>

            <ShimmerCard>
              <ShimmerProblem autoRun />
              <ShimmerDate autoRun />
            </ShimmerCard>
          </>
        ) : (
          <>
            {!problems.length ? (
              <EmptyList />
            ) : (
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
            )}
          </>
        )}
      </Content>
    </Container>
  );
}

Problems.propTypes = {
  route: PropTypes.shape().isRequired,
};

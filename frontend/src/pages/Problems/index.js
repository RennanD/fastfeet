/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import { Container } from './styles';

import ProblemItem from './ProblemItem';
import ShimmerLoader from '~/components/ShimmerLoader';
import EmptyList from '~/components/EmptyList';
import Pagination from '~/components/Pagination';

import api from '~/services/api';

export default function Problems() {
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);
  const [lengthProblems, setLengthProblems] = useState(0);

  async function loadProblems(page) {
    setLoading(true);
    const response = await api.get('/problems', {
      params: {
        page,
      },
    });
    setLengthProblems(response.data.length);
    setProblems(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadProblems();
  }, []);

  return (
    <Container>
      <header>
        <h2>Problemas na entrega</h2>
      </header>

      {loading ? (
        <ShimmerLoader />
      ) : (
        <table>
          {!problems.length ? (
            <EmptyList />
          ) : (
            <>
              <thead>
                <tr>
                  <th>
                    <strong>Encomenda</strong>
                  </th>
                  <th>
                    <strong>Problema</strong>
                  </th>

                  <th>
                    <div>
                      <strong>Ações</strong>
                    </div>
                  </th>
                </tr>
              </thead>
              <ProblemItem problems={problems} />
            </>
          )}
        </table>
      )}
      <Pagination loadItems={loadProblems} itemsLenght={lengthProblems} />
    </Container>
  );
}

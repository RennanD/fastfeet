/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import { MdSearch, MdAdd } from 'react-icons/md';

import { Container } from './styles';

import RecipientItem from './RecipientItem';
import ShimmerLoader from '~/components/ShimmerLoader';
import EmptyList from '~/components/EmptyList';
import Header from '~/components/Header';

import api from '~/services/api';
import history from '~/services/history';

export default function Recipients() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    async function loadRecipients() {
      setLoading(true);
      const response = await api.get('/recipients', {
        params: {
          name,
        },
      });
      setRecipients(response.data);
      setLoading(false);
    }
    loadRecipients();
  }, [name]);

  return (
    <Container>
      <Header>
        <h2>Gerenciando destinatários</h2>

        <div>
          <div>
            <MdSearch size={16} color="#999" />
            <input
              type="text"
              placeholder="Buscar por encomendas"
              onChange={e => setName(e.target.value)}
            />
          </div>

          <button onClick={() => history.push('/recipients/new')} type="button">
            <MdAdd size={22} color="#fff" /> CADASTRAR
          </button>
        </div>
      </Header>

      {loading ? (
        <ShimmerLoader />
      ) : (
        <table>
          {!recipients.length ? (
            <EmptyList />
          ) : (
            <>
              <thead>
                <tr>
                  <th>
                    <strong>ID</strong>
                  </th>
                  <th>
                    <strong>Nome</strong>
                  </th>
                  <th>
                    <strong>Endereço</strong>
                  </th>

                  <th>
                    <div>
                      <strong>Ações</strong>
                    </div>
                  </th>
                </tr>
              </thead>
              <RecipientItem recipients={recipients} />
            </>
          )}
        </table>
      )}
    </Container>
  );
}

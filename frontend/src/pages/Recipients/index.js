/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import { MdSearch, MdAdd } from 'react-icons/md';

import { Container } from './styles';

import RecipientItem from './RecipientItem';
import ShimmerLoader from '~/components/ShimmerLoader';
import EmptyList from '~/components/EmptyList';
import Header from '~/components/Header';
import Pagination from '~/components/Pagination';

import api from '~/services/api';
import history from '~/services/history';

export default function Recipients() {
  const labels = ['ID', 'Nome', 'Endereço', 'Ações'];

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [lengthRecipient, setLengthDeliverymen] = useState(0);

  async function loadRecipients(page) {
    setLoading(true);
    const response = await api.get('/recipients', {
      params: {
        name,
        page,
      },
    });
    setLengthDeliverymen(response.data.length);
    setRecipients(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadRecipients(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  {labels.map(label => (
                    <th key={label}>
                      <strong>{label}</strong>
                    </th>
                  ))}
                </tr>
              </thead>
              {recipients.map(recipient => (
                <RecipientItem recipient={recipient} />
              ))}
            </>
          )}
        </table>
      )}
      {recipients.length > 0 && (
        <Pagination loadItems={loadRecipients} itemsLenght={lengthRecipient} />
      )}
    </Container>
  );
}

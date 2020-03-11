import React, { useEffect, useState } from 'react';

import { MdAdd, MdSearch } from 'react-icons/md';

import { Container } from './styles';

import DeliverymanItem from './DeliverymanItem';
import ShimmerLoader from '~/components/ShimmerLoader';
import EmptyList from '~/components/EmptyList';
import Header from '~/components/Header';

import api from '~/services/api';
import history from '~/services/history';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadDeliverymen() {
      setLoading(true);
      const response = await api.get('/deliverymen', {
        params: {
          name,
        },
      });
      setDeliverymen(response.data);
      setLoading(false);
    }
    loadDeliverymen();
  }, [name]);

  function handleNavigate() {
    history.push('/deliverymen/new');
  }

  return (
    <Container>
      <Header>
        <h2>Gerenciando entregadores</h2>

        <div>
          <div>
            <MdSearch size={16} color="#999" />
            <input
              type="text"
              placeholder="Buscar por encomendas"
              onChange={e => setName(e.target.value)}
            />
          </div>

          <button type="button" onClick={handleNavigate}>
            <MdAdd size={22} color="#fff" /> CADASTRAR
          </button>
        </div>
      </Header>

      {loading ? (
        <ShimmerLoader />
      ) : (
        <table>
          {!deliverymen.length ? (
            <EmptyList />
          ) : (
            <>
              <thead>
                <tr>
                  <th>
                    <strong>ID</strong>
                  </th>
                  <th>
                    <strong>Foto</strong>
                  </th>
                  <th>
                    <strong>Nome</strong>
                  </th>
                  <th>
                    <strong>E-mail</strong>
                  </th>

                  <th>
                    <div>
                      <strong>Ações</strong>
                    </div>
                  </th>
                </tr>
              </thead>

              <DeliverymanItem deliverymen={deliverymen} />
            </>
          )}
        </table>
      )}
    </Container>
  );
}

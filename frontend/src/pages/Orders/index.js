/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import { MdAdd, MdSearch } from 'react-icons/md';

import { Container } from './styles';

import OrderItem from './OrderItem';
import ShimmerLoader from '~/components/ShimmerLoader';
import EmptyList from '~/components/EmptyList';
import Header from '~/components/Header';

import api from '~/services/api';
import history from '~/services/history';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState('');

  useEffect(() => {
    async function loadOrders() {
      setLoading(true);
      const response = await api.get(`/orders?product=${product}`);

      const data = response.data.map(order => ({
        ...order,
        disabled: order.end_date,
      }));

      setOrders(data);
      setLoading(false);
    }
    loadOrders();
  }, [product]);

  function handleNavigate() {
    history.push('/orders/new');
  }

  return (
    <Container>
      <Header>
        <h2>Gerenciando encomendas</h2>

        <div>
          <div>
            <MdSearch size={16} color="#999" />
            <input
              onChange={e => setProduct(e.target.value)}
              type="text"
              placeholder="Buscar por encomendas"
            />
          </div>
          <button onClick={handleNavigate} type="button">
            <MdAdd size={22} color="#fff" /> CADASTRAR
          </button>
        </div>
      </Header>
      {loading ? (
        <ShimmerLoader />
      ) : (
        <table>
          {!orders.length ? (
            <EmptyList />
          ) : (
            <>
              <thead>
                <tr>
                  <th>
                    <strong>ID</strong>
                  </th>
                  <th>Produto</th>
                  <th>
                    <strong>Detinatário</strong>
                  </th>
                  <th>
                    <strong>Entregador</strong>
                  </th>
                  <th>
                    <strong>Cidade</strong>
                  </th>
                  <th>
                    <strong>Estado</strong>
                  </th>
                  <th>
                    <strong>Status</strong>
                  </th>
                  <th>
                    <div>
                      <strong>Ações</strong>
                    </div>
                  </th>
                </tr>
              </thead>

              {!orders.length ? (
                <strong>não há encomendas cadastradas</strong>
              ) : (
                <OrderItem orders={orders} />
              )}
            </>
          )}
        </table>
      )}
    </Container>
  );
}

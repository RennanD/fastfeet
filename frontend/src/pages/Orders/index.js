import React, { useState, useEffect } from 'react';

import { MdAdd, MdSearch } from 'react-icons/md';

import { Container } from './styles';

import OrderItem from './OrderItem';
import ShimmerLoader from '~/components/ShimmerLoader';
import EmptyList from '~/components/EmptyList';
import Header from '~/components/Header';
import Pagination from '~/components/Pagination';

import api from '~/services/api';
import history from '~/services/history';

export default function Orders() {
  const labels = [
    'ID',
    'Produto',
    'Detinatário',
    'Entregador',
    'Cidade',
    'Estado',
    'Status',
    'Ações',
  ];

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState('');
  const [lengthOrders, setLengthOrders] = useState(0);

  async function loadOrders(page) {
    setLoading(true);
    const response = await api.get(`/orders?product=${product}`, {
      params: {
        page,
      },
    });

    const data = response.data.map(order => ({
      ...order,
      disabled: order.end_date,
    }));

    setLengthOrders(response.data.length);
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    loadOrders(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  {labels.map(label => (
                    <th key={label}>
                      <strong>{label}</strong>
                    </th>
                  ))}
                </tr>
              </thead>

              {orders.map(order => (
                <OrderItem order={order} />
              ))}
            </>
          )}
        </table>
      )}
      {orders.length > 0 && (
        <Pagination loadItems={loadOrders} itemsLenght={lengthOrders} />
      )}
    </Container>
  );
}

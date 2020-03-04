import React, { useState, useEffect } from 'react';

import { MdAdd, MdSearch } from 'react-icons/md';

import { Container } from './styles';

import Badge from '~/components/Badge';
import Menu from '~/components/Menu';

import api from '~/services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState('');

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get(`/orders?product=${product}`);
      setOrders(response.data);
    }
    loadOrders();
  }, [product]);

  return (
    <Container>
      <header>
        <h2>Cadastro de encomendas</h2>

        <div>
          <div>
            <MdSearch size={16} color="#999" />
            <input
              onChange={e => setProduct(e.target.value)}
              type="text"
              placeholder="Buscar por encomendas"
            />
          </div>
          <button type="button">
            <MdAdd size={22} color="#fff" /> CADASTRAR
          </button>
        </div>
      </header>

      <table>
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

        <tbody>
          {orders.map(({ order, status }) => (
            <tr key={order.id}>
              <td>
                <span>#{order.id}</span>
              </td>
              <td>
                <span>{order.product}</span>
              </td>
              <td>
                <span>{order.recipient.name}</span>
              </td>
              <td>
                <main>
                  <img
                    src={order.deliveryman.avatar.url}
                    alt={order.deliveryman.name}
                  />
                  <span>{order.deliveryman.name}</span>
                </main>
              </td>
              <td>
                <span>{order.recipient.city}</span>
              </td>
              <td>
                <span>{order.recipient.region}</span>
              </td>
              <td>
                <Badge
                  status={status.title}
                  primary={status.primary}
                  secundary={status.secundary}
                />
              </td>
              <td>
                <div>
                  <Menu visibility />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

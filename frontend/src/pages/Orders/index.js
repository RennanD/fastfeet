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

      const data = response.data.map(order => {
        const { canceled_at, start_date, end_date } = order;

        let status = {
          title: 'PENDENTE',
          primary: '#C1BC35',
          secundary: '#F0F0DF',
        };

        if (canceled_at) {
          status = {
            title: 'CANCELADA',
            primary: '#DE3B3B',
            secundary: '#FAB0B0',
          };
        }

        if (!canceled_at && start_date) {
          if (end_date) {
            status = {
              title: 'ENTREGUE',
              primary: '#2CA42B',
              secundary: '#DFF0DF',
            };
          } else {
            status = {
              title: 'RETIRADA',
              primary: '#4D85EE',
              secundary: '#BAD2FF',
            };
          }
        }

        return {
          ...order,
          status,
        };
      });

      setOrders(data);
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
          {orders.map(order => (
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
                  status={order.status.title}
                  primary={order.status.primary}
                  secundary={order.status.secundary}
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

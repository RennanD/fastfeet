/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {
  MdAdd,
  MdSearch,
  MdEdit,
  MdDeleteForever,
  MdVisibility,
} from 'react-icons/md';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import { Container, Modal } from './styles';

import Badge from '~/components/Badge';
import Menu from '~/components/Menu';
import Header from '~/components/Header';
import ConfirmBox from '~/components/ConfirmBox';

import api from '~/services/api';
import history from '~/services/history';
import { showOrderRequest } from '~/store/modules/order/actions';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get(`/orders?product=${product}`);

      setOrders(response.data);
    }
    loadOrders();
  }, [product]);

  function handleNavigate() {
    history.push('/orders/new');
  }

  async function handleShowOrder(id) {
    const response = await api.get(`/orders/${id}`);

    const order = {
      ...response.data,
      formatedStartDate: response.data.start_date
        ? format(parseISO(response.data.start_date), 'dd/MM/yyyy', {
            locale: ptBR,
          })
        : null,
      formatedEndDate: response.data.end_date
        ? format(parseISO(response.data.end_date), 'dd/MM/yyyy', {
            locale: ptBR,
          })
        : null,
    };

    confirmAlert({
      customUI: () => (
        <Modal>
          <div>
            <strong>Informações da encomenda</strong>

            <p>
              {order.recipient.street}, {order.recipient.number}
            </p>
            <p>
              {order.recipient.city} - {order.recipient.region}
            </p>
            <p>{order.recipient.zipcode}</p>
          </div>

          <div>
            <strong>Datas</strong>
            <p>
              <span>Retirada:</span>{' '}
              {order.formatedStartDate ? order.formatedStartDate : '--/--/----'}
            </p>
            <p>
              <span>Entrega:</span>
              {order.formatedEndDate ? order.formatedEndDate : '--/--/----'}
            </p>
          </div>
          {order.signature && (
            <>
              <strong>Assinatura do destinatário</strong>
              <main>
                <img src={order.signature.url} alt="Assinatura" />
              </main>
            </>
          )}
        </Modal>
      ),
    });
  }

  function handleDelete(id) {
    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfirmBox
          onClose={onClose}
          handleConfirm={async () => {
            try {
              const response = await api.delete(`/orders/${id}`);
              toast.success(response.data.msg);
              onClose();
            } catch ({ response }) {
              toast.error(response.data.error);
              onClose();
            }
          }}
        />
      ),
    });
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
                    src={
                      order.deliveryman.avatar
                        ? order.deliveryman.avatar.url
                        : 'https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif'
                    }
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
                <Badge status={order.status} />
              </td>
              <td>
                <div>
                  <Menu>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleShowOrder(order.id)}
                      >
                        <MdVisibility size={20} color="#7d40e7" />
                        Visualizar
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => dispatch(showOrderRequest(order.id))}
                      >
                        <MdEdit size={20} color="#4D85EE" />
                        Editar
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleDelete(order.id)}
                      >
                        <MdDeleteForever size={20} color="#DE3B3B" />
                        Excluir
                      </button>
                    </li>
                  </Menu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

import React from 'react';

import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { MdVisibility, MdEdit, MdDeleteForever } from 'react-icons/md';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import { Modal } from '../styles';

import Badge from '~/components/Badge';
import Menu from '~/components/Menu';
import ConfirmBox from '~/components/ConfirmBox';

import api from '~/services/api';

import { showOrderRequest } from '~/store/modules/order/actions';

export default function OrderItem({ orders }) {
  const dispatch = useDispatch();

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
      // eslint-disable-next-line react/prop-types
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
                    disabled={order.disabled}
                    type="button"
                    onClick={() => dispatch(showOrderRequest(order.id))}
                  >
                    <MdEdit size={20} color="#4D85EE" />
                    Editar
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleDelete(order.id)}>
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
  );
}

OrderItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  orders: PropTypes.array.isRequired,
};

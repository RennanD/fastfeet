import React from 'react';

import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { MdEdit, MdDeleteForever } from 'react-icons/md';

import Menu from '~/components/Menu';

import { showDeliverymanRequest } from '~/store/modules/deliveryman/actions';

export default function DeliverymanItem({ deliveryman, onDelete }) {
  const dispatch = useDispatch();

  return (
    <tbody>
      <tr key={deliveryman.id}>
        <td>
          <span>#{deliveryman.id}</span>
        </td>
        <td>
          <img
            src={
              deliveryman.avatar
                ? deliveryman.avatar.url
                : 'https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif'
            }
            alt={deliveryman.name}
          />
        </td>
        <td>
          <span>{deliveryman.name}</span>
        </td>
        <td>
          <span>{deliveryman.email}</span>
        </td>

        <td>
          <div>
            <Menu>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(showDeliverymanRequest(deliveryman.id))
                  }
                >
                  <MdEdit size={20} color="#4D85EE" />
                  Editar
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onDelete(deliveryman.id)}>
                  <MdDeleteForever size={20} color="#DE3B3B" />
                  Excluir
                </button>
              </li>
            </Menu>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

DeliverymanItem.propTypes = {
  deliveryman: PropTypes.shape().isRequired,
  onDelete: PropTypes.func.isRequired,
};

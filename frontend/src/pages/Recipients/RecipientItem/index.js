import React from 'react';
import { useDispatch } from 'react-redux';

import { MdEdit, MdDeleteForever } from 'react-icons/md';

import PropTypes from 'prop-types';

import Menu from '~/components/Menu';

import { showRecipientRequest } from '~/store/modules/recipient/actions';

export default function RecipientItem({ recipient, onDelete }) {
  const dispatch = useDispatch();

  return (
    <tbody>
      <tr key={recipient.id}>
        <td>
          <span>#{recipient.id}</span>
        </td>

        <td>
          <span>{recipient.name}</span>
        </td>
        <td>
          <span>
            {recipient.street}, {recipient.number}, {recipient.city} -{' '}
            {recipient.region}{' '}
          </span>
        </td>

        <td>
          <div>
            <Menu>
              <li>
                <button
                  onClick={() => dispatch(showRecipientRequest(recipient.id))}
                  type="button"
                >
                  <MdEdit size={20} color="#4D85EE" />
                  Editar
                </button>
              </li>
              <li>
                <button onClick={() => onDelete(recipient.id)} type="button">
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

RecipientItem.propTypes = {
  recipient: PropTypes.shape().isRequired,
  onDelete: PropTypes.func.isRequired,
};

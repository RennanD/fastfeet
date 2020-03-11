import React from 'react';
import { useDispatch } from 'react-redux';

import { MdEdit, MdDeleteForever } from 'react-icons/md';

import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import Menu from '~/components/Menu';
import ConfirmBox from '~/components/ConfirmBox';

import api from '~/services/api';

import { showRecipientRequest } from '~/store/modules/recipient/actions';

export default function RecipientItem({ recipients }) {
  const dispatch = useDispatch();

  function handleDelete(id) {
    confirmAlert({
      // eslint-disable-next-line react/prop-types
      customUI: ({ onClose }) => (
        <ConfirmBox
          onClose={onClose}
          handleConfirm={async () => {
            try {
              const response = await api.delete(`/recipients/${id}`);
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
      {recipients.map(recipient => (
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
                  <button
                    onClick={() => handleDelete(recipient.id)}
                    type="button"
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
  );
}

RecipientItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  recipients: PropTypes.array.isRequired,
};

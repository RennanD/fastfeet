import React from 'react';

import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import Menu from '~/components/Menu';
import ConfirmBox from '~/components/ConfirmBox';

import { showDeliverymanRequest } from '~/store/modules/deliveryman/actions';
import api from '~/services/api';

export default function DeliverymanItem({ deliveryman }) {
  const dispatch = useDispatch();

  function handleDelete(id) {
    confirmAlert({
      // eslint-disable-next-line react/prop-types
      customUI: ({ onClose }) => (
        <ConfirmBox
          onClose={onClose}
          handleConfirm={async () => {
            try {
              const response = await api.delete(`/deliverymen/${id}`);
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
                <button
                  type="button"
                  onClick={() => handleDelete(deliveryman.id)}
                >
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
};

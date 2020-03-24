import React from 'react';

import { MdCancel, MdVisibility } from 'react-icons/md';

import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import { confirmAlert } from 'react-confirm-alert';

import { ProblemMenu, Modal, ProblemTitle } from './styles';

import api from '~/services/api';

export default function ProblemItem({ problems }) {
  async function handleShowProblem(id) {
    const response = await api.get(`/problems/${id}`);
    confirmAlert({
      customUI: () => (
        <Modal>
          <strong>VISUALIZAR PROBLEMA</strong>
          <span>{response.data.description}</span>
        </Modal>
      ),
    });
  }

  async function handleCancelDelivery(id) {
    try {
      const response = await api.delete(`/problems/${id}/cancel`);

      toast.success(response.data.msg);
    } catch ({ response }) {
      toast.error(response.data.error);
    }
  }

  return (
    <tbody>
      {problems.map(problem => (
        <tr key={problem.id}>
          <td>
            <span>#{problem.delivery.id}</span>
          </td>

          <td>
            <ProblemTitle>{problem.description}</ProblemTitle>
          </td>

          <td>
            <div>
              <ProblemMenu>
                <li>
                  <button
                    type="button"
                    onClick={() => handleShowProblem(problem.id)}
                  >
                    <MdVisibility size={20} color="#4D85EE" />
                    Visualizar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleCancelDelivery(problem.id)}
                    type="button"
                  >
                    <MdCancel size={20} color="#DE3B3B" />
                    Cancelar encomenda
                  </button>
                </li>
              </ProblemMenu>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

ProblemItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  problems: PropTypes.array.isRequired,
};

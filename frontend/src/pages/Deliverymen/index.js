import React, { useEffect, useState } from 'react';

import { MdAdd, MdSearch } from 'react-icons/md';

import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { Container } from './styles';

import DeliverymanItem from './DeliverymanItem';
import ShimmerLoader from '~/components/ShimmerLoader';
import EmptyList from '~/components/EmptyList';
import Header from '~/components/Header';

import api from '~/services/api';
import history from '~/services/history';
import Pagination from '~/components/Pagination';
import ConfirmBox from '~/components/ConfirmBox';

export default function Deliverymen() {
  const labels = ['ID', 'Foto', 'Nome', 'E-mail', 'Ações'];

  const [deliverymen, setDeliverymen] = useState([]);
  const [lengthDeliverymen, setLengthDeliverymen] = useState(0);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  async function loadDeliverymen(page) {
    setLoading(true);
    const response = await api.get('/deliverymen', {
      params: {
        name,
        page,
      },
    });
    setLengthDeliverymen(response.data.length);
    setDeliverymen(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadDeliverymen(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleNavigate() {
    history.push('/deliverymen/new');
  }

  function handleDelete(id) {
    confirmAlert({
      // eslint-disable-next-line react/prop-types
      customUI: ({ onClose }) => (
        <ConfirmBox
          onClose={onClose}
          handleConfirm={async () => {
            try {
              const response = await api.delete(`/deliverymen/${id}`);
              setDeliverymen(
                deliverymen.filter(deliveryman => deliveryman.id !== id)
              );
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
        <h2>Gerenciando entregadores</h2>

        <div>
          <div>
            <MdSearch size={16} color="#999" />
            <input
              type="text"
              placeholder="Buscar por encomendas"
              onChange={e => setName(e.target.value)}
            />
          </div>

          <button type="button" onClick={handleNavigate}>
            <MdAdd size={22} color="#fff" /> CADASTRAR
          </button>
        </div>
      </Header>

      {loading ? (
        <ShimmerLoader />
      ) : (
        <table>
          {!deliverymen.length ? (
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

              {deliverymen.map(deliveryman => (
                <DeliverymanItem
                  deliveryman={deliveryman}
                  onDelete={handleDelete}
                />
              ))}
            </>
          )}
        </table>
      )}
      {deliverymen.length > 0 && (
        <Pagination
          loadItems={loadDeliverymen}
          itemsLenght={lengthDeliverymen}
        />
      )}
    </Container>
  );
}

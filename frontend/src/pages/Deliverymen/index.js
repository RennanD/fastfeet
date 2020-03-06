import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { MdAdd, MdSearch, MdEdit, MdDeleteForever } from 'react-icons/md';

import { Container } from './styles';

import Menu from '~/components/Menu';
import Header from '~/components/Header';

import api from '~/services/api';
import history from '~/services/history';
import { showDeliverymanRequest } from '~/store/modules/deliveryman/actions';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDeliverymen() {
      const response = await api.get('/deliverymen', {
        params: {
          name,
        },
      });
      setDeliverymen(response.data);
    }
    loadDeliverymen();
  }, [name]);

  function handleNavigate() {
    history.push('/deliverymen/new');
  }

  return (
    <Container>
      <Header>
        <h2>Cadastro de encomendas</h2>

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

      <table>
        <thead>
          <tr>
            <th>
              <strong>ID</strong>
            </th>
            <th>
              <strong>Foto</strong>
            </th>
            <th>
              <strong>Nome</strong>
            </th>
            <th>
              <strong>E-mail</strong>
            </th>

            <th>
              <div>
                <strong>Ações</strong>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {deliverymen.map(deliveryman => (
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
                      <button type="button">
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

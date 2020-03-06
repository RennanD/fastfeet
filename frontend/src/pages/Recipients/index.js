import React, { useState, useEffect } from 'react';

import { MdSearch, MdAdd, MdEdit, MdDeleteForever } from 'react-icons/md';

import { Container } from './styles';

import Header from '~/components/Header';
import Menu from '~/components/Menu';

import api from '~/services/api';

export default function Recipients() {
  const [name, setName] = useState('');
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('/recipients', {
        params: {
          name,
        },
      });
      setRecipients(response.data);
    }
    loadRecipients();
  }, [name]);

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

          <button type="button">
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
              <strong>Nome</strong>
            </th>
            <th>
              <strong>Endereço</strong>
            </th>

            <th>
              <div>
                <strong>Ações</strong>
              </div>
            </th>
          </tr>
        </thead>

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
                      <button type="button">
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

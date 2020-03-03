import React from 'react';

import { MdAdd, MdSearch, MdMoreHoriz } from 'react-icons/md';

import { Container } from './styles';

export default function Deliverymen() {
  return (
    <Container>
      <header>
        <h2>Cadastro de encomendas</h2>

        <div>
          <div>
            <MdSearch size={16} color="#999" />
            <input type="text" placeholder="Buscar por encomendas" />
          </div>
          <button type="button">
            <MdAdd size={22} color="#fff" /> CADASTRAR
          </button>
        </div>
      </header>

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
          <tr>
            <td>
              <span>#01</span>
            </td>
            <td>
              <span>Des</span>
            </td>
            <td>
              <span>John Test</span>
            </td>
            <td>
              <span>Teresina</span>
            </td>

            <td>
              <div>
                <button type="button">
                  <MdMoreHoriz color="#999" size={20} />{' '}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

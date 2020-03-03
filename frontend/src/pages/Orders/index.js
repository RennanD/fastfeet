import React from 'react';

import { MdAdd, MdSearch, MdMoreHoriz } from 'react-icons/md';

import { Container } from './styles';

import Badge from '~/components/Badge';

export default function Orders() {
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
              <strong>Detinatário</strong>
            </th>
            <th>
              <strong>Entregador</strong>
            </th>
            <th>
              <strong>Cidade</strong>
            </th>
            <th>
              <strong>Estado</strong>
            </th>
            <th>
              <strong>Status</strong>
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
              <span>Destinatário teste</span>
            </td>
            <td>
              <main>
                <img
                  src="https://avatarfiles.alphacoders.com/218/thumb-218445.jpg"
                  alt=""
                />
                <span>Rennan Teste</span>
              </main>
            </td>
            <td>
              <span>Teresina</span>
            </td>
            <td>
              <span>Piauí</span>
            </td>
            <td>
              <Badge status="CANCELADA" primary="#DE3B3B" secundary="#FAB0B0" />
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

        <tbody>
          <tr>
            <td>
              <span>#01</span>
            </td>
            <td>
              <span>Destinatário teste</span>
            </td>
            <td>
              <span>John Test</span>
            </td>
            <td>
              <span>Teresina</span>
            </td>
            <td>
              <span>Piauí</span>
            </td>
            <td>
              <Badge status="ENTREGUE" primary="#2CA42B" secundary="#DFF0DF" />
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

        <tbody>
          <tr>
            <td>
              <span>#01</span>
            </td>
            <td>
              <span>Destinatário teste</span>
            </td>
            <td>
              <span>John Test</span>
            </td>
            <td>
              <span>Teresina</span>
            </td>
            <td>
              <span>Piauí</span>
            </td>
            <td>
              <Badge status="RETIRADA" primary="#4D85EE" secundary="#BAD2FF" />
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

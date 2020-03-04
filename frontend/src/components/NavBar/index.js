import React from 'react';

import { Container, Content, Nav } from './styles';

import logo from '~/assets/logo.svg';

export default function NavBar() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="" />
          <ul>
            <li>
              <Nav to="/orders">Encomendas</Nav>
            </li>
            <li>
              <Nav to="/deliverymen">Entregadores</Nav>
            </li>
            <li>
              <Nav to="/recipients">Destinários</Nav>
            </li>
            <li>
              <Nav to="/problems">Problemas</Nav>
            </li>
          </ul>
        </nav>
        <aside>
          <div>
            <strong>Admin FastFeet</strong>
            <button type="button">Sair do sistema</button>
          </div>
        </aside>
      </Content>
    </Container>
  );
}

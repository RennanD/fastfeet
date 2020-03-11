import React from 'react';
import { useDispatch } from 'react-redux';

import { Container, Content, Nav } from './styles';

import logo from '~/assets/logo.svg';

import { singOut } from '~/store/modules/auth/actions';

export default function NavBar() {
  const dispatch = useDispatch();

  function handleSingOut() {
    dispatch(singOut());
  }

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
            <button type="button" onClick={handleSingOut}>
              Sair do sistema
            </button>
          </div>
        </aside>
      </Content>
    </Container>
  );
}

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;
    flex: 1;

    img {
      height: 26px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #ddd;
    }
    ul {
      display: flex;
      align-items: center;

      li {
        margin-right: 21px;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    flex: 1;

    strong {
      display: block;
      color: #444;
      width: 120px;
      text-align: right;
    }

    button {
      display: block;
      margin-top: 2px;
      border: 0;
      background: none;
      color: #de3b3b;
      font-size: 14px;
      text-align: right;
      width: 120px;
    }
  }
`;

export const Nav = styled(NavLink).attrs({
  activeStyle: {
    color: '#444',
  },
})`
  font-size: 15px;
  font-weight: bold;
  color: #999;
  transition: color 0.2s;

  &:hover {
    color: #444;
  }
`;

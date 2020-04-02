import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #7d40e7;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  height: 425px;
  padding: 30px 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    strong {
      margin: 5px 0;
    }

    button {
      margin: 5px 0 0;
      border-radius: 4px;
      height: 46px;
      background: #7d40e7;
      color: #fff;
      font-weight: bold;
      border: 0;
      font-size: 14px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#7D40E7')};
      }
    }
  }
`;

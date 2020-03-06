import styled from 'styled-components';
import Button from '~/components/Button';

export const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 34px auto;

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  form {
    header {
      display: flex;
      align-self: stretch;
      align-items: center;
      justify-content: space-between;

      h2 {
        font-size: 24px;
        color: #444444;
      }

      div {
        display: flex;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  background: #fff;
  border-radius: 4px;
  flex-direction: column;
  padding: 30px;
  margin-top: 20px;

  strong {
    margin-top: 15px;
    font-size: 14px;
    color: #444444;
  }

  input {
    border: 1px solid #dddddd;
    padding: 0 15px;
    height: 45px;
    border-radius: 4px;
    color: #666;
    margin: 7px 0;

    &::placeholder {
      color: #999;
    }
  }
`;

export const BackButton = styled(Button)`
  background: #cccccc;
  margin-right: 10px;
`;

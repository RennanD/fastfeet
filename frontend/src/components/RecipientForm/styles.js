import styled from 'styled-components';

import Input from '~/components/Input';
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
  input {
    border: 1px solid #dddddd;
    padding: 10px 15px;
    height: 45px;
    border-radius: 4px;
    color: #666;
    margin: 7px;

    &::placeholder {
      color: #999;
    }
  }
`;

export const TInput = styled(Input)`
  flex: 1;
`;

export const InputContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  strong {
    margin: 15px 7px 4px;
    font-size: 14px;
    color: #444444;
  }

  input {
    height: 40px;
  }
`;

export const Content = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  flex-direction: column;
  padding: 20px;
  margin-top: 20px;

  > main {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
  }
`;

export const BackButton = styled(Button)`
  background: #cccccc;
  margin-right: 10px;
`;

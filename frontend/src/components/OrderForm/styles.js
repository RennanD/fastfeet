import styled from 'styled-components';

import Button from '../Button';

export const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 34px auto;
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
`;

export const Content = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  flex-direction: column;
  padding: 20px;
  margin-top: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const BackButton = styled(Button)`
  background: #cccccc;
  margin-right: 10px;
`;

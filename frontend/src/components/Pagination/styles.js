import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const PageButton = styled.button`
  padding: 10px;
  border-radius: 4px;
  border: 0;
  margin: 10px;
  background: #7d40e7;
  color: #fff;

  :hover {
    opacity: 0.9;
  }
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

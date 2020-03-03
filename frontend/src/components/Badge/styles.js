import styled from 'styled-components';

export const Container = styled.main`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  border-radius: 12px;
  background: ${props => props.secundary};

  div {
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background: ${props => props.primary};
  }

  strong {
    font-size: 12px;
    color: ${props => props.primary};
    margin-left: 6px;
  }
`;

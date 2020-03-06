import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  padding: 0 15px;
  background: #7d40e7;
  width: 112px;
  height: 36px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: 0;
  font-weight: bold;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
  }

  strong {
    font-size: 14px;
  }

  svg {
    margin-right: 5px;
  }
`;

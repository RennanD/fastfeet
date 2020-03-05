import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: ${props => (props.hasThumb ? `2px` : 0)} dashed #ddd;
  height: 150px;
  width: 150px;
  border-radius: 50%;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  strong {
    font-size: 16px;
    color: #dddddd;
  }

  img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    background: #ddd;
  }

  input {
    display: none;
  }
`;

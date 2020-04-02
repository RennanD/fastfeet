import styled from 'styled-components/native';

export const Container = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  padding: 20px;
  height: 300px;
  border: 2px solid ${props => (props.error ? '#fb6f91' : '#eee')};
  background: #fff;
  border-radius: 4px;
  font-size: 18px;
`;

export const Error = styled.Text`
  color: #fb6f91;
  font-size: 16px;
  margin-bottom: 5px;
  align-self: flex-start;
  font-weight: bold;
`;

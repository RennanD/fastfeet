import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  border-radius: 4px;
  background: #fff;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${props => (props.error ? '#fb6f91' : '#fff')};
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  font-size: 14px;
  margin-left: 10px;
  color: #333;
`;

export const Error = styled.Text`
  color: #fb6f91;
  font-size: 16px;
  margin-bottom: 5px;
  align-self: flex-start;
  font-weight: bold;
`;

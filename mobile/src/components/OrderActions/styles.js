import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  border: 1px solid #fafafa;
  border-radius: 4px;
  background: #f8f9fd;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: 20px;
  flex: 1;
  opacity: ${props => (props.disabled ? 0.8 : 1)};
  align-items: center;
`;

export const TextButton = styled.Text`
  text-align: center;
  color: #999;
`;

import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 46px;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
`;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

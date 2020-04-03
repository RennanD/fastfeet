import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  height: ${Platform.OS === 'ios' ? 165 : 155}px;
  background: #7d40e7;
  padding: 15px;
  position: relative;
  padding-top: ${Platform.OS === 'ios' ? 45 : 25}px;
`;

export const Top = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  flex: 1;
  margin-right: 20px;
`;

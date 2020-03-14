import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background: #fff;
`;

export const Header = styled.View`
  height: 120px;
  flex-direction: row;
  align-items: center;
  padding-top: ${getStatusBarHeight()}px;
`;

export const Avatar = styled.Image`
  height: 68px;
  width: 68px;
  border-radius: 34px;
`;

export const InfoView = styled.View`
  flex: 1;
  margin: 0 12px;
`;

export const WelcomeText = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const UserName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #444;
`;

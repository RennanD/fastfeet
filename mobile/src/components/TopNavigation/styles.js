import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 22px;
  color: #444;
  font-weight: bold;
`;

export const TabBar = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  position: relative;
`;

export const Overlay = styled(Animated.View)`
  position: absolute;
  height: 10%;
  width: 50%;
  background: #7d40e7;
  bottom: 0;
  left: 0;
`;

export const Tab = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-right: 5px;
`;

export const TabText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  padding: 5px 0;
`;

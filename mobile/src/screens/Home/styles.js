import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background: #fff;
  padding-top: ${Platform.OS === 'ios' ? `${getStatusBarHeight()}px` : 0};
`;

export const Header = styled.View`
  height: 138px;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  height: 68px;
  width: 68px;
  border-radius: 34px;
  background: #eee;
`;

export const InfoView = styled.View`
  flex: 1;
  margin: 0 12px;
`;

export const WelcomeText = styled.Text`
  font-size: 12px;
  color: #666666;
`;

export const UserName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingVertical: 15,
  },
})`
  flex: 1;
`;

export const ShimmerCard = styled.View`
  border-radius: 4px;
  align-self: stretch;
  background: #fff;
  border: 1px solid #eee;
  margin: 15px 0;
  padding: 20px;
`;

export const ShimmerTitle = styled(ShimmerPlaceHolder)`
  height: 15px;
  border-radius: 10px;
  width: 120px;
`;

export const ShimmerStepper = styled(ShimmerPlaceHolder)`
  height: 15px;
  margin: 20px 0;
  width: 100%;
  border-radius: 10px;
`;

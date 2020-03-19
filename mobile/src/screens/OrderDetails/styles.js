import styled from 'styled-components/native';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export const Background = styled.View`
  flex: 1;
  background: #fff;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 10px;
  margin-top: -70px;
`;

export const Card = styled.View`
  border-radius: 4px;
  padding: 10px 15px;
  align-self: stretch;
  background: #fff;
  border: 1px solid #fafafa;
  margin-bottom: 10px;
`;

export const Top = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: #7d40e7;
  margin-left: 5px;
  font-weight: bold;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #999;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const Info = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
`;

export const ShimmerTitle = styled(ShimmerPlaceHolder)`
  height: 15px;
  border-radius: 10px;
  width: 200px;
  margin: 10px 0 10px;
`;

export const ShimmerInfo = styled(ShimmerPlaceHolder)`
  height: 12px;
  width: 120px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

export const DateView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

export const DateItem = styled.View``;

export const ButtonView = styled.View`
  flex-direction: row;
  border: 1px solid #fafafa;
  border-radius: 4px;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: 20px;
  flex: 1;
  background: #f8f9fd;
  align-items: center;
`;

export const TextButton = styled.Text`
  text-align: center;
  color: #999;
`;

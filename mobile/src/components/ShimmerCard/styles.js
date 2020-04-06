import styled from 'styled-components/native';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export const Container = styled.View`
  border-radius: 4px;
  padding: 10px 15px;
  align-self: stretch;
  background: #fff;
  border: 1px solid #fafafa;
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

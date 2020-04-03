import styled from 'styled-components/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Content = styled.View`
  padding: 30px;
  margin-top: -90px;
`;

export const Title = styled.Text`
  text-align: center;
  align-self: center;
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;

export const ListProblems = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingVertical: 13,
  },
})``;

export const Card = styled.View`
  padding: 20px 15px;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 15px;
`;

export const ShimmerCard = styled.View`
  padding: 25px 15px;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-top: 15px;
`;

export const ShimmerProblem = styled(ShimmerPlaceHolder)`
  height: 20px;
  border-radius: 15px;
  width: 150px;
`;
export const ShimmerDate = styled(ShimmerPlaceHolder)`
  height: 20px;
  border-radius: 15px;
  width: 50px;
`;

export const Problem = styled.Text`
  font-size: 18px;
  color: #999;
  flex: 1;
  margin-right: 10px;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #c1c1c1;
`;

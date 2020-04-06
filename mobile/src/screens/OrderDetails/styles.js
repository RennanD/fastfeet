import styled from 'styled-components/native';

import { StyleSheet } from 'react-native';

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

export const DateView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

export const DateItem = styled.View``;

export const styles = StyleSheet.create({
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

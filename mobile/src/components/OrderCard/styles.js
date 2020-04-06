import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  border-radius: 4px;
  align-self: stretch;
  background: #fff;
  border: 1px solid #eee;
  margin-bottom: 20px;
`;

export const Top = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;

export const Title = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #7d40e7;
`;

export const Body = styled.View`
  padding: 15px 0;
`;

export const Footer = styled.View`
  flex-direction: row;
  background: #f8f9fd;
  padding: 20px;

  justify-content: space-between;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  align-items: flex-end;
`;

export const InfoView = styled.View``;

export const Label = styled.Text`
  font-size: 10px;
  color: #999;
`;

export const Info = styled.Text`
  font-size: 14px;
  color: #444;
  font-weight: bold;
`;

export const LinkButton = styled.TouchableOpacity``;

export const LinkText = styled.Text`
  font-size: 14px;
  color: #7d40e7;
  font-weight: bold;
`;

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

import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Card,
  ButtonView,
  ActionButton,
  Label,
  TextButton,
  Title,
  Info,
  Top,
  Background,
  DateView,
  DateItem,
} from './styles';

import Header from '~/components/Header';

export default function OrderDetails() {
  return (
    <Background>
      <Header title="Entrega 01" />
      <Container>
        <Card
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,

            elevation: 1,
          }}
        >
          <Top>
            <Icon name="truck" size={22} color="#7D40E7" />
            <Title>Informaçoes da encomenda</Title>
          </Top>

          <Label>DESTINATÁRIO</Label>
          <Info>Destinatário teste</Info>

          <Label>ENDEREÇO DE ENTREGA</Label>
          <Info>Rua teste</Info>

          <Label>PRODUTO</Label>
          <Info>Produto teste</Info>
        </Card>

        <Card
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,

            elevation: 1,
          }}
        >
          <Top>
            <Icon name="calendar" size={22} color="#7D40E7" />
            <Title>Informaçoes da encomenda</Title>
          </Top>

          <Label>STATUS</Label>
          <Info>Pendente</Info>

          <DateView>
            <DateItem>
              <Label>DATA DE RETIRADA</Label>
              <Info>18/03/2020</Info>
            </DateItem>

            <DateItem>
              <Label>DATA DE ENTREGA</Label>
              <Info>--/--/----</Info>
            </DateItem>
          </DateView>
        </Card>

        <ButtonView
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,

            elevation: 1,
          }}
        >
          <ActionButton>
            <Icon name="close-circle-outline" color="#E74040" size={28} />
            <TextButton>Informar problema</TextButton>
          </ActionButton>

          <ActionButton
            style={{
              borderLeftColor: '#ddd',
              borderRightColor: '#ddd',
              borderLeftWidth: 1,
              borderRightWidth: 1,
            }}
          >
            <Icon name="alert-circle-outline" color="#E7BA40" size={28} />
            <TextButton>Visualizar problemas</TextButton>
          </ActionButton>

          <ActionButton>
            <Icon name="check-circle-outline" color="#7D40E7" size={28} />
            <TextButton>Confirmar entrega</TextButton>
          </ActionButton>
        </ButtonView>
      </Container>
    </Background>
  );
}

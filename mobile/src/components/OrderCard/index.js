import React from 'react';

import { useNavigation } from '@react-navigation/native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StepIndicator from 'react-native-step-indicator';

import customStyles from './progressStyles';
import {
  Container,
  Title,
  Top,
  Footer,
  InfoView,
  Info,
  Label,
  LinkButton,
  LinkText,
  Body,
} from './styles';

export default function OrderCard({ order }) {
  const { navigate } = useNavigation();

  function handleShowOrder(id) {
    navigate('Details', { order_id: id });
  }

  return (
    <Container
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
        <Icon name="truck" size={24} color="#7d40e7" />
        <Title>{order.product}</Title>
      </Top>

      <Body>
        <StepIndicator
          stepCount={3}
          customStyles={customStyles}
          currentPosition={order.currentPosition}
          labels={['Aguardando Retirada', 'Retirada', 'Entregue']}
        />
      </Body>

      <Footer>
        <InfoView>
          <Label>Data</Label>
          <Info>{order.dateFormatted}</Info>
        </InfoView>

        <InfoView>
          <Label>Cidade</Label>
          <Info>{order.recipient.city}</Info>
        </InfoView>

        <InfoView>
          <LinkButton onPress={() => handleShowOrder(order.id)}>
            <LinkText>Ver detalhes</LinkText>
          </LinkButton>
        </InfoView>
      </Footer>
    </Container>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    product: PropTypes.string,
    status: PropTypes.string,
    dateFormatted: PropTypes.string,
    recipient: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      city: PropTypes.string,
    }),
    currentPosition: PropTypes.number,
  }).isRequired,
};

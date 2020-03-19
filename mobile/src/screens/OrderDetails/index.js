import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import PropTypes from 'prop-types';

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
  ShimmerTitle,
  ShimmerInfo,
} from './styles';

import Header from '~/components/Header';
import api from '~/services/api';

export default function OrderDetails({ route }) {
  const userId = useSelector(state => state.auth.userId);
  const { order_id } = route.params;

  const [order, setOrder] = useState({});

  useEffect(() => {
    async function showOrder() {
      const response = await api.get(
        `/deliverymen/${userId}/orders/${order_id}`
      );

      const data = {
        ...response.data,
        startDateFormatted: response.data.start_date
          ? format(parseISO(response.data.start_date), 'dd/MM/yyyy', {
              locale: ptBR,
            })
          : '--/--/----',
        endDateFormatted: response.data.end_date
          ? format(parseISO(response.data.end_date), 'dd/MM/yyyy', {
              locale: ptBR,
            })
          : '--/--/----',
      };

      setOrder(data);
    }
    showOrder();
  }, [userId, order_id]);

  return (
    <Background>
      <Header title="Entrega 01" />
      {order.recipient ? (
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
            <Info>{order.recipient.name}</Info>

            <Label>ENDEREÇO DE ENTREGA</Label>
            <Info>
              {order.recipient.street}, {order.recipient.number},{' '}
              {order.recipient.city} - {order.recipient.region}
            </Info>

            <Label>PRODUTO</Label>
            <Info>{order.product}</Info>
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
              <Title>Status da encomenda</Title>
            </Top>

            <Label>STATUS</Label>
            <Info>{order.status}</Info>

            <DateView>
              <DateItem>
                <Label>DATA DE RETIRADA</Label>
                <Info>{order.startDateFormatted}</Info>
              </DateItem>

              <DateItem>
                <Label>DATA DE ENTREGA</Label>
                <Info>{order.endDateFormatted}</Info>
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
      ) : (
        <Container>
          <Card>
            <ShimmerTitle autoRun />

            <ShimmerInfo autoRun />
            <ShimmerInfo autoRun />

            <ShimmerTitle />
            <ShimmerInfo autoRun />
            <ShimmerInfo autoRun />
          </Card>

          <Card>
            <ShimmerTitle autoRun />

            <ShimmerInfo autoRun />
            <ShimmerInfo autoRun />

            <ShimmerTitle />
            <ShimmerInfo autoRun />
            <ShimmerInfo autoRun />
          </Card>
        </Container>
      )}
    </Background>
  );
}

OrderDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      order_id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

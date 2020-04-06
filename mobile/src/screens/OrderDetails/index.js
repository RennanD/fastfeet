import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Card,
  Label,
  Title,
  Info,
  Top,
  Background,
  DateView,
  DateItem,
  styles,
} from './styles';

import Header from '~/components/Header';
import api from '~/services/api';
import OrderActions from '~/components/OrderActions';
import ShimmerCard from '~/components/ShimmerCard';

import formatDate from '~/utils/formatDate';

export default function OrderDetails() {
  const userId = useSelector(state => state.auth.userId);
  const { params } = useRoute();
  const { order_id } = params;

  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function showOrder() {
      const response = await api.get(
        `/deliverymen/${userId}/orders/${order_id}`
      );

      const data = {
        ...response.data,
        delivered: !!response.data.end_date,
        startDateFormatted: response.data.start_date
          ? formatDate(response.data.start_date)
          : '--/--/----',
        endDateFormatted: response.data.end_date
          ? formatDate(response.data.end_date)
          : '--/--/----',
      };

      setOrder(data);
    }
    showOrder();
  }, [userId, order_id]);

  if (!order) {
    return (
      <Background>
        <Header title="Detalhes da encomenda" />
        <Container>
          <ShimmerCard />
          <ShimmerCard />
        </Container>
      </Background>
    );
  }

  return (
    <Background>
      <Header title="Detalhes da encomenda" />

      <Container>
        <Card style={styles.shadowBox}>
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

        <Card style={styles.shadowBox}>
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
        <OrderActions order={order} userId={userId} />
      </Container>

      <Container />
    </Background>
  );
}

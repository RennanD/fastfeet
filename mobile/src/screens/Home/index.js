import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Animated } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Header,
  InfoView,
  WelcomeText,
  Avatar,
  UserName,
  ActionsView,
  TabBar,
  Title,
  Tab,
  TabText,
  List,
  Overlay,
} from './styles';

import OrderCard from '~/components/OrderCard';

import api from '~/services/api';

export default function Home() {
  const deliveryman = useSelector(state => state.user.profile);
  const userId = useSelector(state => state.auth.userId);

  const [orders, setOrders] = useState([]);

  const [active, setActive] = useState(0);
  const [xTabOne, setXTabOne] = useState(0);

  const [xTabTwo] = useState(0);
  const [translateX] = useState(new Animated.Value(0));

  async function loadPendingOrders() {
    const response = await api.get(`/deliverymen/${userId}/orders`);

    const data = response.data.map(order => ({
      ...order,
      dateFormatted: format(parseISO(order.created_at), 'dd/MM/yyyy', {
        locale: ptBR,
      }),
      currentPosition: order.status === 'PENDENTE' ? 1 : 2,
    }));
    console.tron.log(data);

    setOrders(data);
  }

  async function loadDeliveries() {
    try {
      const response = await api.get(`/deliverymen/${userId}/deliveries`);
      const data = response.data.map(order => ({
        ...order,
        dateFormatted: format(parseISO(order.end_date), 'dd/MM/yyyy', {
          locale: ptBR,
        }),
        currentPosition: 3,
      }));

      setOrders(data);
    } catch ({ response }) {
      console.tron.log(response);
    }
  }

  useEffect(() => {
    loadPendingOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSlide(value, transform, loadFunc) {
    setActive(value);
    Animated.spring(translateX, {
      toValue: transform,
      delay: 100,
    }).start();

    loadFunc();
  }

  return (
    <Container>
      <Header>
        <Avatar
          source={{
            uri:
              deliveryman.avatar.url ||
              'https://avatars1.githubusercontent.com/u/15038553?s=460&u=86c88160916f81df81c7c7c15b021a171d341771&v=4',
          }}
        />
        <InfoView>
          <WelcomeText>Bem vindo de volta</WelcomeText>
          <UserName>{deliveryman.name}</UserName>
        </InfoView>

        <Icon name="login-variant" color="#E74040" size={30} />
      </Header>

      <ActionsView>
        <Title>Entregas</Title>

        <TabBar>
          <Overlay style={{ transform: [{ translateX }] }} />
          <Tab
            onPress={() => handleSlide(0, xTabTwo, loadPendingOrders)}
            onLayout={event => setXTabOne(event.nativeEvent.layout.x)}
          >
            <TabText style={{ color: active === 1 ? '#999999' : '#7d40e7' }}>
              Pendentes
            </TabText>
          </Tab>

          <Tab
            onPress={() => handleSlide(1, xTabOne, loadDeliveries)}
            onLayout={event => setXTabOne(event.nativeEvent.layout.x)}
          >
            <TabText style={{ color: active === 0 ? '#999999' : '#7d40e7' }}>
              Entregues
            </TabText>
          </Tab>
        </TabBar>
      </ActionsView>

      <List>
        {orders.map(order => (
          <OrderCard key={Number(order.id)} order={order} />
        ))}
      </List>
    </Container>
  );
}

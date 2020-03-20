import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
  ShimmerCard,
  ShimmerTitle,
  ShimmerStepper,
  Empty,
  EmptyText,
} from './styles';

import OrderCard from '~/components/OrderCard';

import api from '~/services/api';

import { singOut } from '~/store/modules/auth/actions';

export default function Home() {
  const isFocused = useIsFocused();

  const deliveryman = useSelector(state => state.user.profile);
  const userId = useSelector(state => state.auth.userId);

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('pending');

  const [loading, setLoading] = useState(false);

  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  const [active, setActive] = useState(0);
  const [xTabOne, setXTabOne] = useState(0);

  const [xTabTwo] = useState(0);
  const [translateX] = useState(new Animated.Value(0));

  useEffect(() => {
    async function loadDeliveries() {
      try {
        setLoading(true);
        const ordersResponse = await api.get(`/deliverymen/${userId}/orders`);
        const deliveriesResponse = await api.get(
          `/deliverymen/${userId}/deliveries`
        );

        const dataOrders = ordersResponse.data.map(order => ({
          ...order,
          dateFormatted: format(parseISO(order.created_at), 'dd/MM/yyyy', {
            locale: ptBR,
          }),
          currentPosition: order.status === 'PENDENTE' ? 1 : 2,
        }));

        const dataDeliveries = deliveriesResponse.data.map(delivery => ({
          ...delivery,
          dateFormatted: format(parseISO(delivery.end_date), 'dd/MM/yyyy', {
            locale: ptBR,
          }),
          currentPosition: 3,
        }));
        setLoading(false);
        setPendingOrders(dataOrders);
        setDeliveries(dataDeliveries);
      } catch ({ response }) {
        setLoading(false);
      }
    }
    if (isFocused) {
      loadDeliveries();
    }
  }, [userId, isFocused]);

  function handleSlide(value, transform, tab) {
    setActiveTab(tab);
    setActive(value);

    Animated.spring(translateX, {
      toValue: transform,
      delay: 100,
    }).start();
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

        <TouchableOpacity onPress={() => dispatch(singOut())}>
          <Icon name="login-variant" color="#E74040" size={30} />
        </TouchableOpacity>
      </Header>

      <ActionsView>
        <Title>Entregas</Title>

        <TabBar>
          <Overlay style={{ transform: [{ translateX }] }} />
          <Tab
            onPress={() => handleSlide(0, xTabTwo, 'pending')}
            onLayout={event => setXTabOne(event.nativeEvent.layout.x)}
          >
            <TabText style={{ color: active === 1 ? '#999999' : '#7d40e7' }}>
              Pendentes
            </TabText>
          </Tab>

          <Tab
            onPress={() => handleSlide(1, xTabOne, 'finish')}
            onLayout={event => setXTabOne(event.nativeEvent.layout.x)}
          >
            <TabText style={{ color: active === 0 ? '#999999' : '#7d40e7' }}>
              Entregues
            </TabText>
          </Tab>
        </TabBar>
      </ActionsView>
      {loading && (
        <>
          <ShimmerCard>
            <ShimmerTitle autoRun />
            <ShimmerStepper autoRun />
            <ShimmerStepper autoRun />
          </ShimmerCard>

          <ShimmerCard>
            <ShimmerTitle autoRun />
            <ShimmerStepper autoRun />
            <ShimmerStepper autoRun />
          </ShimmerCard>
        </>
      )}
      {activeTab === 'finish' ? (
        <>
          {deliveries.length <= 0 ? (
            <Empty>
              <Icon name="close-box-multiple-outline" size={36} color="#999" />
              <EmptyText>Não há encomendas para listar</EmptyText>
            </Empty>
          ) : (
            <List>
              {deliveries.map(delivery => (
                <OrderCard key={delivery.id} order={delivery} />
              ))}
            </List>
          )}
        </>
      ) : (
        <>
          {pendingOrders.lenght <= 0 ? (
            <Empty>
              <Icon name="close-box-multiple-outline" size={36} color="#999" />
              <EmptyText>Não há encomendas para listar</EmptyText>
            </Empty>
          ) : (
            <List>
              {pendingOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </List>
          )}
        </>
      )}
    </Container>
  );
}

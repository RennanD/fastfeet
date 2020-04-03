import React, { useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

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
  Overlay,
} from './styles';

import Pendings from './Pendings';
import Deliveries from './Deliveries';

import { singOut } from '~/store/modules/auth/actions';

export default function Home() {
  const deliveryman = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('pending');

  const [active, setActive] = useState(0);
  const [xTabOne, setXTabOne] = useState(0);

  const [xTabTwo] = useState(0);
  const [translateX] = useState(new Animated.Value(0));

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
            uri: deliveryman.avatar
              ? deliveryman.avatar.url
              : 'https://avatars1.githubusercontent.com/u/15038553?s=460&u=86c88160916f81df81c7c7c15b021a171d341771&v=4',
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

      {activeTab === 'pending' ? <Pendings /> : <Deliveries />}
    </Container>
  );
}

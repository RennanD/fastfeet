import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Header,
  InfoView,
  WelcomeText,
  Avatar,
  UserName,
} from './styles';

import Pendings from './Pendings';
import Deliveries from './Deliveries';

import { singOut } from '~/store/modules/auth/actions';
import TopNavigation from '~/components/TopNavigation';

export default function Home() {
  const deliveryman = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('pending');

  const isFocused = useIsFocused();

  return (
    <Container>
      <Header>
        <Avatar
          source={{
            uri: deliveryman.avatar
              ? deliveryman.avatar.url
              : 'https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif',
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

      <TopNavigation onChange={setActiveTab} />

      {activeTab === 'pending' ? (
        <Pendings focused={isFocused} />
      ) : (
        <Deliveries ocused={isFocused} />
      )}
    </Container>
  );
}

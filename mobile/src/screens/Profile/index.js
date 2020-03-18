import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Container, Avatar, Label, Info, LogoutButton } from './styles';

import { singOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  return (
    <Container>
      <Avatar
        source={{
          uri:
            profile.avatar.url ||
            'https://avatars1.githubusercontent.com/u/15038553?s=460&u=86c88160916f81df81c7c7c15b021a171d341771&v=4',
        }}
      />

      <Label>Nome completo</Label>
      <Info>{profile.name}</Info>

      <Label>E-mail</Label>
      <Info>{profile.email}</Info>

      <Label>Data de cadastro</Label>
      <Info>{profile.registeredDate}</Info>

      <LogoutButton onPress={() => dispatch(singOut())}>Logout</LogoutButton>
    </Container>
  );
}

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
            'https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif',
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

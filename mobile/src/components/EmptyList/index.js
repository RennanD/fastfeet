import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, EmptyText } from './styles';

export default function EmptyList() {
  return (
    <Container>
      <Icon name="notification-clear-all" size={36} color="#999" />
      <EmptyText>Ops, não há nada aqui.</EmptyText>
    </Container>
  );
}

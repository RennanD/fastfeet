import React from 'react';

import { MdClearAll } from 'react-icons/md';

import { Container } from './styles';

export default function EmptyList() {
  return (
    <Container>
      <MdClearAll size={45} color="#999" />
      <strong>Ops, não há nada por aqui :/</strong>
    </Container>
  );
}

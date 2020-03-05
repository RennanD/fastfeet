import React from 'react';

import { Container } from './styles';

export default function Button({ children, style, ...rest }) {
  return (
    <Container style={style} {...rest}>
      {children}
    </Container>
  );
}

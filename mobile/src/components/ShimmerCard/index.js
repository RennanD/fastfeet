import React from 'react';

import { Container, ShimmerTitle, ShimmerInfo } from './styles';

export default function ShimmerCard() {
  return (
    <Container>
      <ShimmerTitle autoRun />

      <ShimmerInfo autoRun />
      <ShimmerInfo autoRun />

      <ShimmerTitle />
      <ShimmerInfo autoRun />
      <ShimmerInfo autoRun />
    </Container>
  );
}

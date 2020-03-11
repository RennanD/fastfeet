import React from 'react';
import ContentLoader from 'react-content-loader';

import { Container } from './styles';

export default function ShimmerLoader() {
  return (
    <Container>
      <header>
        <ContentLoader style={{ width: '100%' }}>
          {/* Only SVG shapes */}
          <rect x="0" y="25" rx="5" ry="5" width="40" height="20" />
          <rect x="120" y="25" rx="5" ry="5" width="80" height="20" />
          <rect x="320" y="25" rx="5" ry="5" width="200" height="20" />
          <rect x="640" y="25" rx="5" ry="5" width="200" height="20" />
          <rect x="1110" y="25" rx="5" ry="5" width="50" height="20" />
        </ContentLoader>
      </header>

      <div>
        <ContentLoader style={{ width: '100%' }}>
          {/* Only SVG shapes */}
          <rect x="0" y="25" rx="5" ry="5" width="40" height="20" />
          <rect x="120" y="25" rx="5" ry="5" width="80" height="20" />
          <rect x="320" y="25" rx="5" ry="5" width="200" height="20" />
          <rect x="640" y="25" rx="5" ry="5" width="200" height="20" />
          <rect x="1110" y="25" rx="5" ry="5" width="50" height="20" />
        </ContentLoader>
      </div>

      <div>
        <ContentLoader style={{ width: '100%' }}>
          {/* Only SVG shapes */}
          <rect x="0" y="25" rx="5" ry="5" width="40" height="20" />
          <rect x="120" y="25" rx="5" ry="5" width="80" height="20" />
          <rect x="320" y="25" rx="5" ry="5" width="200" height="20" />
          <rect x="640" y="25" rx="5" ry="5" width="200" height="20" />
          <rect x="1110" y="25" rx="5" ry="5" width="50" height="20" />
        </ContentLoader>
      </div>
    </Container>
  );
}

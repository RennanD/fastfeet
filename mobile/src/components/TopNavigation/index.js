import React, { useState } from 'react';
import { Animated } from 'react-native';

import PropTypes from 'prop-types';

import { Container, Overlay, Title, Tab, TabBar, TabText } from './styles';

export default function TopNavigation({ onChange }) {
  const [active, setActive] = useState(0);
  const [xTabOne, setXTabOne] = useState(0);
  const [xTabTwo] = useState(0);
  const [translateX] = useState(new Animated.Value(0));

  function handleSlide(value, transform, tab) {
    onChange(tab);
    setActive(value);

    Animated.spring(translateX, {
      toValue: transform,
      delay: 100,
    }).start();
  }

  return (
    <Container>
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
    </Container>
  );
}

TopNavigation.propTypes = {
  onChange: PropTypes.func.isRequired,
};

import React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PropTypes from 'prop-types';

import { Container, Title, Top } from './styles';

export default function Header({ title }) {
  return (
    <>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Container>
        <Top>
          <TouchableOpacity>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>

          <Title>{title}</Title>
        </Top>
      </Container>
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

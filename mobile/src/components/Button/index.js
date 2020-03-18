/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ActivityIndicator, ViewPropTypes } from 'react-native';

import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({ children, loading, style, ...rest }) {
  return (
    <Container style={style} {...rest}>
      {loading ? (
        <ActivityIndicator size={24} color="#fff" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  style: ViewPropTypes.style.isRequired,
};

Button.defaultProps = {
  loading: false,
};

/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Button({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>;
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

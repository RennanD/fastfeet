import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Header({ children }) {
  return <Container>{children}</Container>;
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

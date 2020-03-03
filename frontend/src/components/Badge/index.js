import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Badge({ status, primary, secundary }) {
  return (
    <Container primary={primary} secundary={secundary}>
      <div />
      <strong>{status}</strong>
    </Container>
  );
}

Badge.propTypes = {
  status: PropTypes.string.isRequired,
  primary: PropTypes.string.isRequired,
  secundary: PropTypes.string.isRequired,
};

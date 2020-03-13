import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import PropTypes from 'prop-types';

import { Container, TInput } from './styles';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      <TInput placeholder="Digite seu ID de cadastro" {...rest} />
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};

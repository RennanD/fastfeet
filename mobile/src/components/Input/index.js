/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import PropTypes from 'prop-types';

import { Container, TInput, Error } from './styles';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
    });
  }, [registerField, fieldName]);

  return (
    <>
      {error && <Error>* {error}</Error>}
      <Container error={error}>
        <TInput
          ref={inputRef}
          defaultValue={defaultValue}
          placeholder="Digite seu ID de cadastro"
          {...rest}
        />
      </Container>
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};

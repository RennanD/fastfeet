/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import PropTypes from 'prop-types';

import { Container, Error } from './styles';

export default function TextArea({ name, ...rest }) {
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
      <Container
        multiline
        error={error}
        numberOfLines={10}
        placeholder="Inclua aqui o problema que ocorreu na entrega."
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <Error>* {error}</Error>}
    </>
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
};

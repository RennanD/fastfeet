/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';

import Proptypes from 'prop-types';

import ReactInputMask from 'react-input-mask';

import { useField } from '@unform/core';

import { Container, LabelContainer } from './styles';

export default function MaskInput({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container error={error}>
      <LabelContainer>
        <strong>{label}</strong>
        {error && <span>{error} *</span>}
      </LabelContainer>
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
    </Container>
  );
}

MaskInput.propTypes = {
  name: Proptypes.string.isRequired,
  label: Proptypes.string.isRequired,
};

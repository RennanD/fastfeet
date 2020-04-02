/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { useField } from '@unform/core';

import { Container, LabelContainer } from './styles';

export default function Input({ name, label, style, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container style={style} error={error}>
      <LabelContainer>
        <strong>{label}</strong>
        {error && <span>{error} *</span>}
      </LabelContainer>
      <input ref={inputRef} defaultValue={defaultValue} {...rest} />
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

Input.defaultProps = {
  style: {},
};

/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { useField } from '@unform/core';

export default function Input({ name, ...rest }) {
  const inputRef = React.useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return <input ref={inputRef} defaultValue={defaultValue} {...rest} />;
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};

/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';

import Proptypes from 'prop-types';

import ReactInputMask from 'react-input-mask';

import { useField } from '@unform/core';

export default function MaskInput({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
  );
}

MaskInput.propTypes = {
  name: Proptypes.string.isRequired,
};

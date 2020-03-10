/* eslint-disable no-else-return */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { useField } from '@unform/core';
import AsyncSelect from 'react-select/async';

import api from '~/services/api';

export default function RecipientInput({ name, ...rest }) {
  const [recipients, setRecipients] = useState([]);

  const recipientRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/recipients', {
        params: {
          name: '',
        },
      });

      const data = response.data.map(recipient => ({
        value: recipient.id,
        label: recipient.name,
      }));

      setRecipients(data);
    }
    loadData();
  }, []);

  const filterColors = inputValue => {
    return recipients.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      resolve(filterColors(inputValue));
    });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: recipientRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        } else {
          if (!ref.select.state.value) {
            return '';
          }

          return ref.select.state.value.value;
        }
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={recipients}
      loadOptions={promiseOptions}
      defaultValue={defaultValue}
      placeholder="Entregador exemplo "
      ref={recipientRef}
      classNamePrefix="react-select"
      {...rest}
    />
  );
}

RecipientInput.propTypes = {
  name: PropTypes.string.isRequired,
};

/* eslint-disable no-else-return */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';

import api from '~/services/api';

export default function DeliverymanInput({ name, ...rest }) {
  const [deliverymen, setDeliverymen] = useState([]);

  const deliverymanRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/deliverymen', {
        params: {
          name: '',
        },
      });

      const data = response.data.map(deliveryman => ({
        value: deliveryman.id,
        label: deliveryman.name,
      }));

      setDeliverymen(data);
    }
    loadData();
  }, []);

  const filterColors = inputValue => {
    return deliverymen.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: deliverymanRef.current,
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
      loadOptions={promiseOptions}
      defaultValue={defaultValue}
      placeholder="Destinatário exemplo "
      ref={deliverymanRef}
      classNamePrefix="react-select"
      {...rest}
    />
  );
}

DeliverymanInput.propTypes = {
  name: PropTypes.string.isRequired,
};

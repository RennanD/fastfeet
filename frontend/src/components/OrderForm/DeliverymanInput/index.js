/* eslint-disable no-else-return */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { useField } from '@unform/core';
import AsyncSelect from 'react-select/async';

import api from '~/services/api';

export default function DeliverymanInput({ ...rest }) {
  const [deliverymen, setDeliverymen] = useState([]);

  const deliverymanRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField('deliveryman');

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
      resolve(filterColors(inputValue));
    });

  useEffect(() => {
    registerField({
      name: 'deliveryman_id',
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
      defaultOptions={deliverymen}
      loadOptions={promiseOptions}
      defaultValue={defaultValue}
      placeholder="Entregador exemplo "
      ref={deliverymanRef}
      classNamePrefix="react-select"
      {...rest}
    />
  );
}

DeliverymanInput.propTypes = {
  name: PropTypes.string.isRequired,
};

/* eslint-disable no-else-return */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { useField } from '@unform/core';
import AsyncSelect from 'react-select/async';

import { Container, LabelContainer } from './styles';

import api from '~/services/api';

export default function SelectInput({ name, label, input_item, ...rest }) {
  const [selectData, setSelectData] = useState([]);

  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/${input_item}`, {
        params: {
          name: '',
        },
      });

      const data = response.data.map(item => ({
        value: item.id,
        label: item.name,
      }));

      setSelectData(data);
    }
    loadData();
  }, [input_item]);

  const filterColors = inputValue => {
    return selectData.filter(i =>
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
      ref: selectRef.current,
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
    <Container error={error}>
      <LabelContainer>
        <strong>{label}</strong>
        {error && <span>{error}</span>}
      </LabelContainer>
      <AsyncSelect
        cacheOptions
        defaultOptions={selectData}
        loadOptions={promiseOptions}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
    </Container>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  input_item: PropTypes.string.isRequired,
};

import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import PropTypes from 'prop-types';

import { MdPhotoSizeSelectActual } from 'react-icons/md';

import { Container, Label } from './styles';

import api from '~/services/api';

export default function AvatarInput({ name }) {
  const { defaultValue, registerField } = useField('avatar');

  const ref = useRef();

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name,
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [name, ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('/files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <Label hasThumb={!preview} htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="" />
        ) : (
          <>
            <MdPhotoSizeSelectActual size={50} color="#DDDDDD" />
            <strong>Adicionar foto</strong>
          </>
        )}
        <input
          id="avatar"
          type="file"
          ref={ref}
          data-file={file}
          onChange={handleChange}
          name={name}
        />
      </Label>
    </Container>
  );
}

AvatarInput.propTypes = {
  name: PropTypes.string.isRequired,
};

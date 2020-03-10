import React from 'react';

import PropTypes from 'prop-types';

import { Container, CancelButton, TitleBox } from './styles';
import Button from '../Button';

export default function ConfirmBox({ handleConfirm, onClose }) {
  return (
    <Container>
      <TitleBox>Deseja realmente excluir este registro?</TitleBox>

      <div>
        <CancelButton onClick={onClose}>Cancelar</CancelButton>

        <Button onClick={handleConfirm}>Confirmar</Button>
      </div>
    </Container>
  );
}

ConfirmBox.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

import React from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { Container, Content, InputGroup, BackButton } from './styles';

import Button from '../Button';
import MaskInput from '../MaskInput';
import Input from '~/components/Input';

import history from '~/services/history';

export default function RecipientForm({ title }) {
  const loading = useSelector(state => state.recipient.loading);

  return (
    <Container>
      <header>
        <h2>{title}</h2>

        <div>
          <BackButton onClick={() => history.push('/recipients')} type="button">
            <MdChevronLeft size={28} color="#fff" /> <strong>VOLTAR</strong>
          </BackButton>
          <Button type="submit">
            {loading ? (
              'Salvando...'
            ) : (
              <>
                <MdCheck size={24} color="#fff" />
                <strong>SALVAR</strong>
              </>
            )}
          </Button>
        </div>
      </header>

      <Content>
        <Input label="Nome" name="name" placeholder="Desinatário exemplo" />

        <InputGroup>
          <Input
            style={{ flex: 2 }}
            label="Rua"
            name="street"
            placeholder="Rua exemplo"
          />

          <Input label="Número" name="number" placeholder="0000" />

          <Input label="Complemento" name="complement" />
        </InputGroup>

        <InputGroup>
          <Input label="Cidade" name="city" placeholder="Cidade Exemplo" />

          <Input label="Estado" name="region" placeholder="Estado Exemplo" />

          <MaskInput
            label="CEP"
            mask="99999-999"
            name="zipcode"
            placeholder="64000-00"
          />
        </InputGroup>
      </Content>
    </Container>
  );
}

RecipientForm.propTypes = {
  title: PropTypes.string.isRequired,
};

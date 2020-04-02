import React from 'react';
import { useSelector } from 'react-redux';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import PropTypes from 'prop-types';

import { Container, Content, InputGroup, BackButton } from './styles';

import SelectInput from './SelectInput';
import Button from '../Button';

import history from '~/services/history';
import Input from '../Input';

export default function OrderForm({ title }) {
  const loading = useSelector(state => state.order.loading);

  return (
    <Container>
      <header>
        <h2>{title}</h2>

        <div>
          <BackButton type="button" onClick={() => history.push('/orders')}>
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
        <InputGroup>
          <SelectInput
            label="Destinatário"
            name="recipient_id"
            input_item="recipients"
            placeholder="Destinatário Teste"
          />

          <SelectInput
            label="Entregador"
            name="deliveryman_id"
            placeholder="Entregador Teste"
            input_item="deliverymen"
          />
        </InputGroup>

        <Input label="Produto" name="product" />
      </Content>
    </Container>
  );
}

OrderForm.propTypes = {
  title: PropTypes.string.isRequired,
};

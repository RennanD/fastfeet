/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';

import { Form } from '@unform/web';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import PropTypes from 'prop-types';

import { Container, Content, InputView, BackButton, TInput } from './styles';

import RecipientInput from './RecipientInput';
import DeliverymanInput from './DeliverymanInput';
import Button from '../Button';

import history from '~/services/history';

export default function OrderForm({ title, onSubmit, ...rest }) {
  const loading = useSelector(state => state.order.loading);

  return (
    <Container>
      <Form onSubmit={onSubmit} {...rest}>
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
          <main>
            <InputView style={{ marginRight: 10 }}>
              <strong>Destinatário</strong>
              <RecipientInput name="recipient_id" />
            </InputView>

            <InputView style={{ marginLeft: 10 }}>
              <strong>Entrgador</strong>
              <DeliverymanInput name="deliveryman_id" />
            </InputView>
          </main>

          <InputView>
            <strong>Produto</strong>
            <TInput name="product" />
          </InputView>
        </Content>
      </Form>
    </Container>
  );
}

OrderForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

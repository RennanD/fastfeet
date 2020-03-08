/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';

import { Container, BackButton, Content } from './styles';

import AvatarInput from './AvatarInput';
import Button from '~/components/Button';

import history from '~/services/history';

export default function DeliverymanForm({ title, onSubmit, ...rest }) {
  const loading = useSelector(state => state.deliveryman.loading);

  return (
    <Container>
      <Form onSubmit={onSubmit} {...rest}>
        <header>
          <h2>{title}</h2>

          <div>
            <BackButton
              onClick={() => history.push('/deliverymen')}
              type="button"
            >
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
          <AvatarInput name="avatar_id" />

          <strong>Nome</strong>
          <Input placeholder="Exemplo Entregador" name="name" />

          <strong>E-mail</strong>
          <Input placeholder="entregador@fastfeet.com.br" name="email" />
        </Content>
      </Form>
    </Container>
  );
}

DeliverymanForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

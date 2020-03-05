import React from 'react';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';

import { Container, BackButton, Content } from './styles';

import AvatarInput from './AvatarInput';
import Button from '~/components/Button';

export default function NewDeliveryman() {
  return (
    <Container>
      <Form>
        <header>
          <h2>Cadastro de entregadores</h2>

          <div>
            <BackButton>
              <MdChevronLeft size={28} color="#fff" /> <strong>VOLTAR</strong>
            </BackButton>
            <Button>
              <MdCheck size={24} color="#fff" /> <strong>SALVAR</strong>
            </Button>
          </div>
        </header>

        <Content>
          <AvatarInput name="avatar_id" />

          <strong>Nome</strong>
          <Input name="nome" />

          <strong>E-mail</strong>
          <Input name="email" />
        </Content>
      </Form>
    </Container>
  );
}

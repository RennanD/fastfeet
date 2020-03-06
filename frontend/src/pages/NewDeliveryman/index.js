import React, { useState } from 'react';

import * as Yup from 'yup';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';

import { toast } from 'react-toastify';
import { Container, BackButton, Content } from './styles';

import AvatarInput from './AvatarInput';
import Button from '~/components/Button';

import history from '~/services/history';
import api from '~/services/api';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().required('O e-mail é obrigatório'),
  avatar_id: Yup.number(),
});

export default function NewDeliveryman() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.post('/deliverymen', data);

      toast.success('Deliveryman registered successful');
      setLoading(false);
      history.push('/deliverymen');
    } catch ({ response }) {
      toast.error(response.data.error);
      setLoading(false);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema}>
        <header>
          <h2>Cadastro de entregadores</h2>

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

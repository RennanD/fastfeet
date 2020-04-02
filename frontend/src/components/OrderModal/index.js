import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function OrderModal({ order }) {
  return (
    <Container>
      <div>
        <strong>Informações da encomenda</strong>

        <p>
          {order.recipient.street}, {order.recipient.number}
        </p>
        <p>
          {order.recipient.city} - {order.recipient.region}
        </p>
        <p>{order.recipient.zipcode}</p>
      </div>

      <div>
        <strong>Datas</strong>
        <p>
          <span>Retirada:</span>{' '}
          {order.formatedStartDate ? order.formatedStartDate : '--/--/----'}
        </p>
        <p>
          <span>Entrega:</span>
          {order.formatedEndDate ? order.formatedEndDate : '--/--/----'}
        </p>
      </div>
      {order.signature && (
        <>
          <strong>Assinatura do destinatário</strong>
          <main>
            <img src={order.signature.url} alt="Assinatura" />
          </main>
        </>
      )}
    </Container>
  );
}

OrderModal.propTypes = {
  order: PropTypes.shape().isRequired,
};

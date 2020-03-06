import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import DeliverymanForm from '../DeliverymanForm';
import api from '~/services/api';

export default function Edit({ match }) {
  const [deliveryman, setDeliveryman] = useState({});

  useEffect(() => {
    async function loadDeliveryman() {
      const { id } = match.params;

      const response = await api.get(`/deliverymen/${id}`);
      console.log(response.data.avatar);

      setDeliveryman(response.data);
    }
    loadDeliveryman();
  }, [match.params]);

  if (!deliveryman) return <div />;

  return <DeliverymanForm initialData={deliveryman} />;
}

Edit.propTypes = {
  match: PropTypes.node.isRequired,
};

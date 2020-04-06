import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';

import { ActivityIndicator } from 'react-native';
import Snackbar from 'react-native-snackbar';

import { Container, ActionButton, TextButton } from './styles';
import api from '~/services/api';

export default function OrderActions({ order, userId }) {
  const { id, product, delivered, start_date } = order;

  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation();

  async function handleInitDelivery() {
    setLoading(true);
    try {
      const response = await api.put(`/deliverymen/${userId}/deliveries/${id}`);
      Snackbar.show({
        text: response.data.msg,
        backgroundColor: '#2CA42B',
      });
      setLoading(false);
      navigate('Home');
    } catch ({ response }) {
      Snackbar.show({
        text: response.data.error,
        backgroundColor: '#DE3B3B',
        duration: Snackbar.LENGTH_LONG,
      });
      setLoading(false);
    }
  }

  function handleInfromProblem() {
    navigate('InformProblem', { order_id: id });
  }

  function handleShowProblems() {
    navigate('Problems', { order_id: id, product });
  }

  function handleConfirmDelivery() {
    navigate('ConfirmDelivery', { order_id: id });
  }

  return (
    <Container
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
      }}
    >
      <ActionButton onPress={handleInfromProblem} disabled={delivered}>
        <Icon name="close-circle-outline" color="#E74040" size={28} />
        <TextButton>Informar problema</TextButton>
      </ActionButton>

      <ActionButton
        disabled={delivered}
        onPress={handleShowProblems}
        style={{
          borderLeftColor: '#ddd',
          borderRightColor: '#ddd',
          borderLeftWidth: 1,
          borderRightWidth: 1,
        }}
      >
        <Icon name="alert-circle-outline" color="#E7BA40" size={28} />
        <TextButton>Visualizar problemas</TextButton>
      </ActionButton>

      {start_date ? (
        <ActionButton onPress={handleConfirmDelivery} disabled={delivered}>
          <Icon name="check-circle-outline" color="#7D40E7" size={28} />
          <TextButton>Confirmar entrega</TextButton>
        </ActionButton>
      ) : (
        <ActionButton onPress={handleInitDelivery} disabled={delivered}>
          {loading ? (
            <ActivityIndicator size={20} color="#444" />
          ) : (
            <>
              <Icon name="truck-delivery" color="#7D40E7" size={28} />
              <TextButton>Retirar entrega</TextButton>
            </>
          )}
        </ActionButton>
      )}
    </Container>
  );
}

OrderActions.propTypes = {
  order: PropTypes.shape().isRequired,
  userId: PropTypes.number.isRequired,
};

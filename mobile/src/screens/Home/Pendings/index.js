import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { List, ShimmerCard, ShimmerStepper, ShimmerTitle } from '../styles';

import EmptyList from '~/components/EmptyList';
import OrderCard from '~/components/OrderCard';

import api from '~/services/api';

export default function Pendings() {
  const userId = useSelector(state => state.auth.userId);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [pendingOrders, setPendingOrders] = useState([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  async function loadOrders() {
    try {
      if (total > 0 && pendingOrders.length === total) {
        return;
      }

      if (!pendingOrders.length) {
        setLoading(true);
      }

      if (total > pendingOrders.length && pendingOrders.length >= 5) {
        setLoadingMore(true);
      }

      if (loadingMore) {
        return;
      }

      const response = await api.get(`/deliverymen/${userId}/orders`, {
        params: {
          page,
        },
      });

      const data = response.data.map(order => ({
        ...order,
        dateFormatted: format(parseISO(order.created_at), 'dd/MM/yyyy', {
          locale: ptBR,
        }),
        currentPosition: order.status === 'PENDENTE' ? 1 : 2,
      }));

      setPendingOrders([...pendingOrders, ...data]);

      setTotal(response.headers['x-total-count']);
      setPage(page + 1);

      setLoading(false);
      setLoadingMore(false);
    } catch ({ response }) {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <ShimmerCard>
        <ShimmerTitle autoRun />
        <ShimmerStepper autoRun />
        <ShimmerStepper autoRun />
      </ShimmerCard>
    );
  }

  return (
    <>
      {!pendingOrders.length ? (
        <EmptyList />
      ) : (
        <List
          data={pendingOrders}
          keyExtractor={order => String(order.id)}
          onEndReached={loadOrders}
          onEndReachedThreshold={0.1}
          renderItem={({ item: order }) => (
            <OrderCard key={order.id} order={order} />
          )}
        />
      )}
      {loadingMore && (
        <ActivityIndicator
          size={28}
          style={{ alignSelf: 'center' }}
          color="#7d40e7"
        />
      )}
    </>
  );
}

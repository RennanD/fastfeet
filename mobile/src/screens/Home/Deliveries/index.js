import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

import { List, ShimmerCard, ShimmerStepper, ShimmerTitle } from '../styles';

import OrderCard from '~/components/OrderCard';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import formatDate from '~/utils/formatDate';

export default function Pendings() {
  const userId = useSelector(state => state.auth.userId);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [deliveries, setDeliveries] = useState([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  async function loadDeliveires() {
    try {
      if (total > 0 && deliveries.length === total) {
        return;
      }

      if (!deliveries.length) {
        setLoading(true);
      }

      if (total > deliveries.length && deliveries.length >= 5) {
        setLoadingMore(true);
      }

      if (loadingMore) {
        return;
      }

      const response = await api.get(`/deliverymen/${userId}/deliveries`, {
        params: {
          page,
        },
      });

      const data = response.data.map(order => ({
        ...order,
        dateFormatted: formatDate(order.end_date),
        currentPosition: 3,
      }));

      setDeliveries([...deliveries, ...data]);

      setTotal(response.headers['x-total-count']);
      setPage(page + 1);

      setLoading(false);
      setLoadingMore(false);
    } catch ({ response }) {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDeliveires();
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
      {deliveries.length ? (
        <List
          data={deliveries}
          keyExtractor={order => String(order.id)}
          onEndReached={loadDeliveires}
          onEndReachedThreshold={0.1}
          renderItem={({ item: order }) => (
            <OrderCard key={order.id} order={order} />
          )}
        />
      ) : (
        <EmptyList />
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

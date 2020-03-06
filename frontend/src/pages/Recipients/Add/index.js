import React from 'react';

// import { Container } from './styles';

import RecipientForm from '~/components/RecipientForm';

export default function Add() {
  return <RecipientForm onSubmit={() => console.log('oi')} />;
}

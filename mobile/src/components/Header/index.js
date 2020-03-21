import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, Title, Top } from './styles';

export default function Header({ title }) {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Container>
        <Top>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>

          <Title>{title}</Title>
        </Top>
      </Container>
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

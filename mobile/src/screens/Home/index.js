import React from 'react';

import {
  Container,
  Header,
  InfoView,
  WelcomeText,
  Avatar,
  UserName,
} from './styles';

export default function Home() {
  return (
    <Container>
      <Header>
        <Avatar
          source={{
            uri:
              'https://avatars1.githubusercontent.com/u/15038553?s=460&u=86c88160916f81df81c7c7c15b021a171d341771&v=4',
          }}
        />
        <InfoView>
          <WelcomeText>Bem vindo de volta</WelcomeText>
          <UserName>Rennan Douglas</UserName>
        </InfoView>
      </Header>
    </Container>
  );
}

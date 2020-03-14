import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
  enabled: Platform.OS === 'ios',
})`
  flex: 1;
  background: #7d40e7;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

export const Logo = styled.Image`
  margin-bottom: 50px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
  background: #82bf18;
  align-self: stretch;
`;

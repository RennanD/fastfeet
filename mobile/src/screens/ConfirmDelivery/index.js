import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';

import SnackBar from 'react-native-snackbar';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Content,
  Camera,
  SubmitButton,
  CameraView,
  CameraButton,
  Thumbnail,
} from './styles';
import Header from '~/components/Header';
import api from '~/services/api';

export default function ConfirmDelivery() {
  const [camera, setCamera] = useState(null);
  const [file, setFile] = useState(null);

  const userId = useSelector(state => state.auth.userId);

  const { params } = useRoute();
  const { navigate } = useNavigation();
  async function handleTakePicture() {
    if (camera) {
      const options = {
        quality: 0.5,
        base64: false,
        width: 800,
      };
      const data = await camera.takePictureAsync(options);

      setFile(data);
    }
  }

  async function handleSubmit() {
    const { order_id } = params;

    try {
      const dataFile = new FormData();
      dataFile.append('file', {
        uri: file.uri,
        name: 'signature.jpg',
        type: 'image/jpeg',
      });

      const response = await api.post('/files', dataFile);

      const { id } = response.data;

      const finishResponse = await api.put(
        `/deliverymen/${userId}/deliveries/${order_id}/finish`,
        {
          signature_id: id,
        }
      );

      SnackBar.show({
        text: finishResponse.data.msg,
        backgroundColor: '#2CA42B',
      });
      navigate('Home');
    } catch (err) {
      SnackBar.show({
        text: 'Take a photo of the signature',
        backgroundColor: '#DE3B3B',
        duration: SnackBar.LENGTH_LONG,
      });
    }
  }

  return (
    <Container>
      <Header title="Confirmar entrega" />
      <Content>
        <CameraView>
          {file ? (
            <Thumbnail source={{ uri: file.uri }} />
          ) : (
            <Camera
              ref={ref => {
                setCamera(ref);
              }}
              type={RNCamera.Constants.Type.back}
              captureAudio={false}
              androidCameraPermissionOptions={{
                title: 'Permissão para usar a câmera',
                message: 'Precisamos de permissão para usar sua câmera',
                buttonPositive: 'OK',
                buttonNegative: 'Cancelar',
              }}
            />
          )}

          {file ? (
            <CameraButton onPress={() => setFile(null)}>
              <Icon name="close" size={24} color="#fff" />
            </CameraButton>
          ) : (
            <CameraButton onPress={handleTakePicture}>
              <Icon name="camera" size={24} color="#fff" />
            </CameraButton>
          )}
        </CameraView>
        <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
      </Content>
    </Container>
  );
}

import styled from 'styled-components';
import Button from '~/components/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  height: 200px;
  width: 400px;
  padding: 20px;
  border-radius: 4px;

  > div {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const TitleBox = styled.h2`
  color: #444;
`;

export const CancelButton = styled(Button)`
  background: #fb6f91;
  margin-right: 10px;
`;

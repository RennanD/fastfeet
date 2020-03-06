import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.header`
  margin: 34px 0 15px;
  height: 100px;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 24px;
    color: #444;
    font-weight: bold;
  }

  > div {
    margin-top: 34px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      height: 36px;
      width: 273px;
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      padding: 0 15px;
      background: #fff;
      border-radius: 4px;

      input {
        display: flex;
        flex: 1;
        height: 100%;
        border: 0;
        color: #444;

        &::placeholder {
          color: #999;
        }
      }
    }
  }

  button {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    background: #7d40e7;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border: 0;
    border-radius: 4px;

    &:hover {
      background: ${darken(0.08, '#7d40e7')};
    }
  }

  svg {
    margin-right: 5px;
  }
`;

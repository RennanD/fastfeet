import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 34px auto;
`;

export const Modal = styled.div`
  padding: 25px;
  width: 450px;
  background: #fff;
  border-radius: 4px;

  strong {
    font-size: 14px;
    color: #444;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;

    p {
      margin-top: 7px;
      font-size: 16px;
      color: #666;

      span {
        font-weight: bold;
        margin-right: 5px;
      }
    }
  }

  img {
    margin-top: 5px;
    height: 150px;
    width: 300px;
    align-self: center;
    text-align: center;
    background: #eee;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

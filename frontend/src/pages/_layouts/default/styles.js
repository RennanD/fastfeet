import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;

  header {
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
    }

    svg {
      margin-right: 5px;
    }
  }

  table {
    width: 100%;
    border-spacing: 0 21px;

    thead th {
      color: #444;
      text-align: left;
      padding: 0 20px;

      > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }

    tbody {
      td {
        padding: 12px;
        vertical-align: middle;
        background: #fff;
        padding: 16px 20px;

        &:first-child {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        &:last-child {
          border-bottom-right-radius: 4px;
          border-top-right-radius: 4px;
        }

        img {
          height: 35px;
          width: 35px;
          border-radius: 50%;
          margin-right: 5px;
        }

        > main {
          display: flex;
          align-items: center;
        }

        > div {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        span {
          font-size: 16px;
          color: #666;
        }

        button {
          border: 0;
          background: none;
          padding: 6px;
        }
      }
    }
  }
`;

import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;

  table {
    width: 100%;
    border-spacing: 0 21px;

    thead th {
      color: #444;
      text-align: left;
      padding: 0 20px;
      font-size: 16px;

      > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
    tbody {
      td {
        text-overflow: ellipsis;

        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        padding: 12px;
        vertical-align: middle;
        background: #fff;
        padding: 13px 20px;

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
          margin-right: 10px;
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

          margin: 0;
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

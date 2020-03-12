import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  > button {
    border: 0;
    background: none;
  }
`;

export const ActionList = styled.ul`
  position: absolute;
  width: 220px;
  left: calc(50% - 110px);
  top: calc(100%);
  background: #fff;
  border-radius: 4px;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 5;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 7px);
    top: -10px;
    height: 0;
    width: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 10px solid #fff;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    & + li {
      margin-top: 5px;
      padding-top: 5px;
      border-top: 1px solid #eee;
    }

    button {
      width: 100%;
      display: flex;
      align-items: center;
      color: #444;
      font-size: 16px;

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      svg {
        margin-right: 10px;
      }
    }
  }
`;

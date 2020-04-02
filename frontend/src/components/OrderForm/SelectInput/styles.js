import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 5px;

  .react-select__control {
    border: 1px solid ${props => (props.error ? '#fb6f91' : '#ddd')};
  }

  input {
    padding: 12px 15px;
    border-radius: 4px;
    color: #666;
    margin: 7px 0;

    &::placeholder {
      color: #999;
    }
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 7px;

  span {
    color: #fb6f91;
    margin-left: 7px;
    font-weight: bold;
    font-size: 12px;
  }

  strong {
    font-size: 14px;
    color: #444444;
  }
`;

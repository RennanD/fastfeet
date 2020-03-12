import styled from 'styled-components';

import Menu from '~/components/Menu';

export const ProblemMenu = styled(Menu)`
  background: #000;
  width: 230px;
  left: calc(50% - 115px);
`;

export const Modal = styled.div`
  padding: 25px;
  width: 450px;
  background: #fff;
  border-radius: 4px;

  strong {
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: #444;
  }

  span {
    display: block;
    font-size: 16px;
    color: #666;
    margin-top: 10px;
  }
`;

export const ProblemTitle = styled.span`
  width: 100%;
  max-width: 800px;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
`;

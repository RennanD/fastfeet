import React, { useState, useRef } from 'react';

import PropTypes from 'prop-types';

import {
  MdVisibility,
  MdEdit,
  MdDeleteForever,
  MdMoreHoriz,
} from 'react-icons/md';

import { Container, ActionList } from './styles';

import { useOnClickOutside } from '~/hooks';

export default function Menu({ visibility }) {
  const menuRef = useRef();

  const [visible, setVisible] = useState(false);

  useOnClickOutside(menuRef, () => {
    if (visible) {
      setVisible(false);
    }
  });

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <button type="button" onClick={handleToggleVisible}>
        <MdMoreHoriz color="#999" size={20} />
      </button>

      <ActionList ref={menuRef} visible={visible}>
        {visibility && (
          <li>
            <button type="button">
              <MdVisibility size={20} color="#8E5BE8" />
              Visualizar
            </button>
          </li>
        )}
        <li>
          <button type="button">
            <MdEdit size={20} color="#4D85EE" />
            Editar
          </button>
        </li>
        <li>
          <button type="button">
            <MdDeleteForever size={20} color="#DE3B3B" />
            Excluir
          </button>
        </li>
      </ActionList>
    </Container>
  );
}

Menu.propTypes = {
  visibility: PropTypes.bool,
};

Menu.defaultProps = {
  visibility: true,
};

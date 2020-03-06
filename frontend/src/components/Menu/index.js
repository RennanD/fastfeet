import React, { useState, useRef } from 'react';

import PropTypes from 'prop-types';

import { MdMoreHoriz } from 'react-icons/md';

import { Container, ActionList } from './styles';

import { useOnClickOutside } from '~/hooks';

export default function Menu({ children }) {
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
        {children}
      </ActionList>
    </Container>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

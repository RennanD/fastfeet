import React, { useState } from 'react';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import PropTypes from 'prop-types';

import { Container, PageButton } from './styles';

export default function Pagination({ loadItems, itemsLenght }) {
  const [page, setPage] = useState(1);

  function prevPage() {
    if (page === 1) {
      return;
    }

    const pageNumber = page - 1;
    setPage(pageNumber);
    loadItems(pageNumber);
  }

  function nextPage() {
    if (itemsLenght < 20) {
      return;
    }

    const pageNumber = page + 1;

    setPage(pageNumber);
    loadItems(pageNumber);
  }

  return (
    <Container>
      <PageButton disabled={page === 1} onClick={prevPage}>
        <MdChevronLeft color="#fff" size={20} />
      </PageButton>
      <PageButton disabled={itemsLenght < 20} onClick={nextPage}>
        <MdChevronRight color="#fff" size={20} />
      </PageButton>
    </Container>
  );
}

Pagination.propTypes = {
  loadItems: PropTypes.func.isRequired,
  itemsLenght: PropTypes.number.isRequired,
};

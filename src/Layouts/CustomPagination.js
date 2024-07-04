import React from 'react';
import { Pagination } from 'react-bootstrap';

function CustomPagination ({ totalPages, currentPage, onPageChange }) {
    const pageNumbers = [];

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        pageNumbers.push(1);
        if (currentPage > 3) pageNumbers.push('...');
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pageNumbers.push(i);
        }
        if (currentPage < totalPages - 2) pageNumbers.push('...');
        pageNumbers.push(totalPages);
    }

    return (
        <Pagination>
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
            {pageNumbers.map((number, index) =>
                number === '...' ? (
                    <Pagination.Ellipsis key={index} />
                ) : (
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)}>
                        {number}
                    </Pagination.Item>
                )
            )}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
    );
};

export default CustomPagination;
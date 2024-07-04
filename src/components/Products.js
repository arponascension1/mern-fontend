import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {Button, Form} from "react-bootstrap";
import ReactPaginate from 'react-paginate';

import CenterBox from "../Layouts/CenterBox";

const Products = () => {
    const products = useSelector((state) => state?.products?.products) || null;
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const [page, setPage] = useState(Number(params.get('page')) || 1);
    const [search, setSearch] = useState(params.get('search') || '');
    let [limit, setLimit] = useState(params.get('limit') || 5);


    const handlePageChange = (selectedItem) => {
        const pageNumber = selectedItem.selected + 1;
        setPage(pageNumber);
        params.set('page', pageNumber);
        navigate({ pathname: location.pathname, search: params.toString() });
    };

    const handleSearchChange = (event) => {
        const newSearch = event.target.value;
        setSearch(newSearch);
        if (newSearch) {
            params.set('search', newSearch);
        } else {
            params.delete('search');
        }
        params.delete('page'); // Reset to page 1 on new search or when search is cleared
        navigate({ pathname: location.pathname, search: params.toString() });
    };

    useEffect(() => {
        const filters = {
            search: params.get('search') || '',
            page: Number(params.get('page')) || 1, // Update page based on URL parameter
            pageSize: products.pageSize
        };
        setPage(filters.page);
    }, [location.search, products.pageSize]);


    function handleLimits(event) {
        const newLimit = event.target.value;
        setLimit(newLimit);
        if (newLimit) {
            params.set('limit', newLimit);
        }
        params.delete('page');
        navigate({ pathname: location.pathname, search: params.toString() });
    }

    return (
        <>
            {user ? (
                <Link to="/products/add">Add Product</Link>
            ) : ''}
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearchChange}
                className="form-control"
            />

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products?.products?.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>
                                {user ? (
                                    <Button as={NavLink} to={`/products/${product._id}`}>
                                        Edit
                                    </Button>
                                ) : ''}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'....'}
                breakClassName={'page-link'}
                pageCount={products.totalPages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
                forcePage={page - 1} // This ensures the active page is correctly highlighted
            />
            <Form.Group className="mb-3">
                <Form.Label>Limit</Form.Label>
                <Form.Select onChange={handleLimits} defaultValue={limit} options={limit} >
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='20'>20</option>
                </Form.Select>
            </Form.Group>
        </>
    );
};

export default Products;

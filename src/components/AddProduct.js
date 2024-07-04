import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import CenterBox from "../Layouts/CenterBox";
import {Button, Form} from "react-bootstrap";
import {addProduct} from "../store/actions/productActions";


function AddProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const disabledBnt = useSelector((state) => state.products.disableBtn);
    const validationError = useSelector((state) => state.products.error?.validationErrors) || null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addProduct({name, description, price}));
            navigate('/products')
        }catch (e){}
    };
    return (
        <><CenterBox>
                <h4 className="header-text">Add Product</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                      placeholder="Product Name"/>
                        {validationError?.name ? <p className="text-danger">{validationError.name}</p> : ''}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text"
                                      as="textarea"
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}
                                      placeholder="Product Description"/>
                        {validationError?.description ? <p className="text-danger">{validationError.description}</p> : ''}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text"
                                      value={price}
                                      onChange={(e) => setPrice(e.target.value)}
                                      placeholder="Price"/>
                        {validationError?.price ? <p className="text-danger">{validationError.price}</p> : ''}
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={disabledBnt}>
                        Update
                    </Button>
                </Form>
            </CenterBox>
        </>
    )
}
export default AddProduct;
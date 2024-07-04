import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {useState} from "react";
import CenterBox from "../Layouts/CenterBox";
import {Button, Form} from "react-bootstrap";
import {updateProduct} from "../store/actions/productActions";


function EditProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = useSelector((state) => state.products.product) || null;


    const [name, setName] = useState(product?.name);
    const [description, setDescription] = useState(product?.description);
    const [price, setPrice] = useState(product?.price);

    const disabledBnt = useSelector((state) => state.products.disableBtn);
    const validationError = useSelector((state) => state.products.error?.validationErrors) || null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateProduct(product._id, {name, description,price}));
            navigate('/products')
        }catch (e){}
    };
    if(!product){
        return  <Navigate to='/'/>
    }
    return (
        <>
            <CenterBox>
                <h4 className="header-text">Update Product</h4>
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
export default EditProduct;
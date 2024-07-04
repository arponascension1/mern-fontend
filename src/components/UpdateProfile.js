import {Alert, Button, Form} from "react-bootstrap";
import CenterBox from "../Layouts/CenterBox";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {updateUser} from "../store/actions/authActions";
import {useNavigate} from "react-router-dom";


function UpdateProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const disabledBnt = useSelector((state) => state.auth.disableBtn);
    const validationError = useSelector((state) => state.auth.error?.validationErrors) || null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateUser({name, email}));
            navigate('/');
        }catch (e){}
    };
    return (
        <>
            <CenterBox>
                <h4 className="header-text">Update Profile</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                      placeholder="Name"/>
                        {validationError?.name ? <p className="text-danger">{validationError.name}</p> : ''}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      placeholder="Email"/>
                        {validationError?.email ? <p className="text-danger">{validationError.email}</p> : ''}
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={disabledBnt}>
                        Update
                    </Button>
                </Form>
            </CenterBox>
        </>
    )
}

export default UpdateProfile;
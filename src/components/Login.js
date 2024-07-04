import {Alert, Button, Form} from "react-bootstrap";
import { useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../store/actions/authActions";
import {Navigate, useNavigate} from "react-router-dom";
import CenterBox from "../Layouts/CenterBox";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const error = useSelector((state) => state.auth.error) || null;
    const disabledBnt = useSelector((state) => state.auth.disableBtn);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await dispatch(login({email, password})) 
        }catch (e) {

        }
    };
    if(isAuthenticated){
        return  <Navigate to='/dashboard'/>
    }
    return(
        <>

            <CenterBox>

                <h4 className="header-text">Login Here</h4>
                {
                    error && !error.validationErrors ?
                        <Alert key="danger" variant="danger">
                            {error}
                        </Alert>
                        : ""
                }
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      placeholder="Email"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                      placeholder="Password"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={disabledBnt}>
                        Login
                    </Button>
                </Form>
            </CenterBox>
        </>

    );
}

export default Login;
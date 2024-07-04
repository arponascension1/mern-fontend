import CenterBox from "../Layouts/CenterBox";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {login, register} from "../store/actions/authActions";
import {useState} from "react";

function Register(){
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const validationError = useSelector((state) => state.auth.error?.validationErrors) || null;
    const disabledBnt = useSelector((state) => state.auth.disableBtn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if(isAuthenticated){
        return  <Navigate to='/dashboard'/>
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            await dispatch(register({name, email, password, passwordConfirmation}))
            navigate('/');
        }catch (e){

        }
    };
    return (
        <>
            <CenterBox>
                <h4 className="header-text">Register Here</h4>
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
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                      placeholder="Password"/>
                        {validationError?.password ? <p className="text-danger">{validationError.password}</p> : ''}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                                      value={passwordConfirmation}
                                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                                      placeholder="Password"/>
                        {validationError?.passwordConfirmation ? <p className="text-danger">{validationError.passwordConfirmation}</p> : ''}
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={disabledBnt}>
                        Register
                    </Button>
                </Form>
            </CenterBox>
        </>
    )
}
export default Register;
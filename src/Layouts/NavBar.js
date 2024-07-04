import {Container, Dropdown, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutProfile} from "../store/actions/authActions";

function NavBar() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const logout = async () => {
        try {
            await dispatch(logoutProfile());
            navigate('/');
        }catch (e){
            console.log(e);
        }

    }
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/products">Products</Nav.Link>

                    {user ? (
                        <>

                            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                            <Nav>
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title={user.name}
                                    menuVariant="dark"
                                >
                                    <NavDropdown.Item as={NavLink} to="/update-profile">Update User</NavDropdown.Item>

                                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </>

                    ):(
                        <>
                            <Nav.Link as={NavLink} to="/login" >Login</Nav.Link>
                            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                        </>

                    )}
                </Nav>
            </Container>

        </Navbar>
    )
}
export default NavBar;
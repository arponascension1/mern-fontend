import './App.css';
import NavBar from "./Layouts/NavBar";
import {Container} from "react-bootstrap";
import {Outlet, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import useLoadingBar from "./src/hooks/useLoadingBar";
function App() {
    useLoadingBar();
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect( () => {
       dispatch({type: 'CLEAR_ERROR'});
    }, [location, dispatch]);
    return (
        <>
            <NavBar/>
            <Container>
                <Outlet/>
            </Container>
        </>
    );
}
export default App;

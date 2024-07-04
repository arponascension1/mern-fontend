import {createBrowserRouter} from "react-router-dom";
import Home from "../components/Home";
import App from "../App";
import Login from "../components/Login";
import withAuth from "../Layouts/withAuth";
import Dashboard from "../components/Dashboard";
import Register from "../components/Register";
import UpdateProfile from "../components/UpdateProfile";
import Products from "../components/Products";
import EditProduct from "../components/EditProduct";
import AddProduct from "../components/AddProduct";
import {getProducts, loadProduct, loadUser} from "./loader";

const  ProtectedDashboard = withAuth(Dashboard)
const ProtectedUpdateProfile = withAuth(UpdateProfile)
const ProtectedEditProfile = withAuth(EditProduct)
const ProtectedAddProduct = withAuth(AddProduct)

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        loader : loadUser,
        children: [
            {
                path: '',
                element: <Home/>,
            },
            {
              path: 'dashboard',
              element: <ProtectedDashboard/>,
            },
            {
                path: 'update-profile',
                element: <ProtectedUpdateProfile/>,
            },
            {
                path: 'login',
                element: <Login/>,
            },
            {
                path: 'register',
                element: <Register/>
            },
            {
                path: "products",
                element: <Products/>,
                loader: getProducts,
            },
            {
              path: "products/add",
              element: <ProtectedAddProduct/>
            },
            {
                path: "products/:id",
                element: <ProtectedEditProfile/>,
                loader:({ params }) => loadProduct(params.id),
            }
        ]
    }
]);
export default router;
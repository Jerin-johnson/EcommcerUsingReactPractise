import {createBrowserRouter} from "react-router-dom";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import App from "../App";
import Alreadyauthprotect from "../components/Alreadyauthprotect";


const route = createBrowserRouter([
    {
        path:"/",
        element:<App/>
    },
    {
        path:"/register",
        element:<Alreadyauthprotect><Register/></Alreadyauthprotect>
    },
    {
        path:"/login",
        element:<Alreadyauthprotect><Login/></Alreadyauthprotect>
    }
]);


export default route;
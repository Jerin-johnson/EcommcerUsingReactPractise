import {createBrowserRouter} from "react-router-dom";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import App from "../App";
import Alreadyauthprotect from "../components/Alreadyauthprotect";
import Sellpage from "../pages/sell/Sellpage";
import Productlisting from "../components/productlist/Productlisting";
import Myproducts from "../pages/myproducts/Myproducts";
import Proctedroute from "../components/Proctedroute";


const route = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Productlisting/>
            },
            {
                path:"/sell",
                element:<Proctedroute><Sellpage/></Proctedroute>
            },
            {
                path:"/sell/:id",
                element:<Proctedroute><Sellpage/></Proctedroute>
            },
            {
                path:"/myproducts",
                element:<Proctedroute><Myproducts/></Proctedroute>
            }
        ]
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
import {createBrowserRouter} from "react-router-dom";
import Index from "../pages";
import Login from "../pages/login";
import Register from "../pages/register";

const routes = [
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},
    {path: "/", element: <Index/>},
    {path: "*", element: <>404</>}



]

const router = createBrowserRouter(routes)

export default router;

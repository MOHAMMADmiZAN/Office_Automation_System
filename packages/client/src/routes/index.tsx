import {createBrowserRouter} from "react-router-dom";
import Index from "../pages/home";
import Login_Page from "../pages/login";
import Register_Page from "../pages/register";
import Event from "../pages/event";
import BaseLayout from "../layouts/Base.Layout";

const routes = [
    {path: "/login", element: <Login_Page/>},
    {path: "/register", element: <Register_Page/>},
    {path: "/event", element: <Event/>},
    {path: "/dashboard",  element: <Index/>},
    {path: "/users", element: <Index/>},
    {path: "/", element: <BaseLayout/>},
    {path: "*", element: <>404</>}



]

const router = createBrowserRouter(routes)

export default router;

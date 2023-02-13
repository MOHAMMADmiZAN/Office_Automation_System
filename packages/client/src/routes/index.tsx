import {createBrowserRouter} from "react-router-dom";
import Index from "../pages/home";
import Login_Page from "../pages/login";
import Register_Page from "../pages/register";

const routes = [
    {path: "/login", element: <Login_Page/>},
    {path: "/register", element: <Register_Page/>},
    {path: "/", element: <Index/>},
    {path: "*", element: <>404</>}



]

const router = createBrowserRouter(routes)

export default router;

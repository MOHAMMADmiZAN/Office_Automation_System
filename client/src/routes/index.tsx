import {createBrowserRouter} from "react-router-dom";
import Index from "../pages";
import Login from "../pages/login";
import Register from "../pages/register";

const routes = [
    {path: "/", element: <Index/>},
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},


]

const router = createBrowserRouter(routes)

export default router;

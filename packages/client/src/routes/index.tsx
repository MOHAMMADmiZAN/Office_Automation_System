import {createBrowserRouter} from "react-router-dom";
import MainLayout from '../layouts/mainlayout/MainLayout'
import { Outlet } from "react-router-dom";
import Index from "../pages";
import Login_Page from "../pages/login";
import Register_Page from "../pages/register";
import MenuBar from '../components/organisms/MenuBar/MenuBar';
import Dashboard from '../pages/Dashboard/Dashboard_Page';
import Email from '../pages/Email/Email_Page';
import Profile from '../pages/Profile/Profile_Page';

const routes = [
    {path: "/login", element: <Login_Page/>},
    {path: "/register", element: <Register_Page/>},
    {path: "/dashboard", element: <Dashboard/>},
    {path: "/email", element: <Email/>},
    {path: "/profile", element: <Profile/>},
    // {path: "/", element: <Index/>},
    {path: "/", element: <MainLayout />},
    {path: "*", element: <>404</>}



]

const router = createBrowserRouter(routes)

export default router;

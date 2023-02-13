import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Index from "../pages/home";
import Login_Page from "../pages/login";
import Register_Page from "../pages/register";
import Event from "../pages/event";
import BaseLayout from "../layouts/Base.Layout";

const routes =
    createRoutesFromElements([
        <Route path="/login" element={<Login_Page/>}/>,
        <Route path="/register" element={<Register_Page/>}/>,
        <Route path="/" element={<BaseLayout/>}>
            <Route path="event" element={<Event/>}/>
            <Route path={"users"} element={<div>Users</div>}/>
            <Route path={"dashboard"} element={<Index/>}/>
        </Route>,
        <Route path="*" element={<div>404</div>}/>
    ])





const router = createBrowserRouter(routes)

export default router;

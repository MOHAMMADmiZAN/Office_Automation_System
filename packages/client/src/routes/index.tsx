import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Index from "../pages/home";
import Login_Page from "../pages/login";
import Event from "../pages/event";
import NotFound from '../pages/not-found/notfound';
import BaseLayout from "../layouts/Base.Layout";
import User from "../pages/User";
import UserDetails from "../pages/User/UserDetails/UserDetails";

const routes =
    createRoutesFromElements([
        <Route path="/login" element={<Login_Page/>}/>,
        <Route path="/" element={<BaseLayout/>}>
            <Route path="events" element={<Event/>}/>
            <Route path={"users"} element={<User/>}/>
            <Route path={'users/:id'} element={<UserDetails/>} />
            <Route path={"dashboard"} element={<Index/>}/>
        </Route>,
        <Route path="*" element={<NotFound />}/>
    ])





const router = createBrowserRouter(routes)

export default router;

import {createBrowserRouter} from "react-router-dom";
import Index from "../pages";

const routes = [
    {path: "/", element: <Index/>},

]

const router = createBrowserRouter(routes)

export default router;

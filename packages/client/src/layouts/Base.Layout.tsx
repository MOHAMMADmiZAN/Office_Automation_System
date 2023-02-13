import React, {useLayoutEffect, useState} from 'react';
import Header, {AccountMenuItem} from "../components/organisms/Header/Header";
import Sidebar, {SidebarMenuItem} from "../components/organisms/SideBar/Sidebar";
import EventIcon from "@mui/icons-material/Event";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import {Container, Grid} from "@mui/material";
import CommonCard from "../components/molecules/CommonCard/CommonCard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {Dashboard, Logout} from "@mui/icons-material";
import {Actions, useStoreActions} from "easy-peasy";
import {AuthType} from "../store/models/AuthModel";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";




interface BASE_LAYOUT_PROPS {
    layoutChildren?: React.ReactNode;


}
const SidebarMenu: SidebarMenuItem[] = [
    {
        icon: <Dashboard/>,
        text: "Dashboard",
        isDivider: true,
        id: 'dashboard',
    },

    {
        icon: <EventIcon/>,
        text: "Events",

        isDivider: true,
        id: 'event',


    },
    {
        icon: <PermContactCalendarIcon/>,
        text: "Users List",
        isDivider: false,
        id: 'users',

    },

]




const BaseLayout: React.FC<BASE_LAYOUT_PROPS> = ({layoutChildren}): JSX.Element => {
    const navigation = useNavigate();
    const {isAuth} = useAuth();
    useLayoutEffect(() => {
        !isAuth && navigation("/login");
    },[isAuth]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const {Logout:LogOutMethod} = useStoreActions((actions: Actions<AuthType>) => actions.Auth);
    const [AccountMenu] = useState<AccountMenuItem[]>([
        {
            icon: <ManageAccountsIcon fontSize="small"/>,
            text: "Manage Accounts",
            onClick: () => {
                console.log("Manage Accounts");
            }

        },
        {
            icon: <Logout fontSize="small"/>,
            text: "Logout",
            onClick: () => {
                LogOutMethod();
            }
        }
    ]);
    const handleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    let activeUrl = useLocation();



    return (
        <>
          <Header controlSidebar={handleSidebar} accountMenuItems={AccountMenu}/>
           <Grid container>
               <Grid item xs={2} >
                   <Sidebar isSidebarOpen={isSidebarOpen}  sidebarMenu={SidebarMenu} ActiveUrl={activeUrl.pathname}/>
               </Grid>
                <Grid item xs={10}>
                  <Container sx={{marginTop:'10px'}}>
                      {/*{layoutChildren}*/}
                      {<Outlet/>}
                  </Container>
                </Grid>
           </Grid>
        </>
    );
};

export default BaseLayout;
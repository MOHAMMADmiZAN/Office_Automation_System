import React, {useEffect, useState} from 'react';
import Header, {AccountMenuItem} from "../components/organisms/Header/Header";
import Sidebar, {SidebarMenuItem} from "../components/organisms/SideBar/Sidebar";
import EventIcon from "@mui/icons-material/Event";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import {Box, Grid} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LockIcon from "@mui/icons-material/Lock";
import {Dashboard, Logout} from "@mui/icons-material";
import {Actions, useStoreActions} from "easy-peasy";
import {AuthType} from "../store/models/AuthModel";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ChangePassword from '../components/organisms/ChangePassword/ChangePassword';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


interface BASE_LAYOUT_PROPS {
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
        id: 'events',
    },
    {
        icon: <PermContactCalendarIcon/>,
        text: "Users List",
        isDivider: true,
        id: 'users',
    },
    {
        icon: <AppRegistrationIcon/>,
        text: "Attendance",
        isDivider: true,
        id: 'attendance',
    }, {

        icon: <ExitToAppIcon/>,
        text: "Leave",
        isDivider: false,
        id: 'leave',
    }
]


const BaseLayout: React.FC<BASE_LAYOUT_PROPS> = (): JSX.Element => {
    const navigation = useNavigate();
    const {isAuth, userId} = useAuth();

    useEffect(() => {
        !isAuth && navigation("/login", {replace: true})
    }, [isAuth]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isChangePass, setIsChangePass] = useState(false);
    const {Logout: LogOutMethod} = useStoreActions((actions: Actions<AuthType>) => actions.Auth);

    const handleChangePasswordModal = () => {
        setIsChangePass(!isChangePass)
    }


    const [AccountMenu] = useState<AccountMenuItem[]>([
        {
            icon: <ManageAccountsIcon fontSize="small"/>,
            text: "Manage Accounts",
            onClick: () => navigation(`/users/${userId}`)
        },
        {
            icon: <LockIcon fontSize="small"/>,
            text: "Change Password",
            onClick: () => handleChangePasswordModal()
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
    let location = useLocation();
    let activeUrl = location.pathname === '/' ? '/dashboard' : location.pathname;


    return (
        <>
            <Header controlSidebar={handleSidebar} accountMenuItems={AccountMenu}/>
            <Grid container>
                <Grid item xs={2} md={2}>
                    <Sidebar isSidebarOpen={isSidebarOpen} sidebarMenu={SidebarMenu} ActiveUrl={activeUrl}/>
                </Grid>
                <Grid item xs={10} md={10}>
                    <Box sx={{padding: '30px 50px'}}>
                        {<Outlet/>}
                    </Box>
                </Grid>
            </Grid>
            <ChangePassword open={isChangePass} handleClose={handleChangePasswordModal}/>
        </>
    );
};

export default BaseLayout;
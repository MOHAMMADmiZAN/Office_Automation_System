import React, {useState} from 'react';
import Header, {AccountMenuItem} from "../components/organisms/Header/Header";
import Sidebar, {SidebarMenuItem} from "../components/organisms/SideBar/Sidebar";
import EventIcon from "@mui/icons-material/Event";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import {Container, Grid} from "@mui/material";
import CommonCard from "../components/molecules/CommonCard/CommonCard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {Logout} from "@mui/icons-material";
import {Actions, useStoreActions} from "easy-peasy";
import {AuthType} from "../store/models/AuthModel";

export interface baseComponentItem{
    id: string;
    component: React.ReactNode;
}

interface BASE_LAYOUT_PROPS {
    baseComponents: baseComponentItem[];

}
const SidebarMenu: SidebarMenuItem[] = [

    {
        icon: <EventIcon/>,
        text: "Events",

        isDivider: false,
        id: 'event',


    },
    {
        icon: <PermContactCalendarIcon/>,
        text: "User Contacts",
        isDivider: true,
        id: 'userContact',

    },

]


const BaseLayout: React.FC<BASE_LAYOUT_PROPS> = ({baseComponents}): JSX.Element => {
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
        console.log(isSidebarOpen);
    }
    const [activeId, setActiveID] = useState<string>(SidebarMenu[0].id);
    const handleActive = (id?:string) => {
        setActiveID(id!)

    }
    return (
        <>
          <Header controlSidebar={handleSidebar} accountMenuItems={AccountMenu}/>
           <Grid container>
               <Grid item xs={2} >
                   <Sidebar isSidebarOpen={isSidebarOpen} handleActiveId={handleActive} ActiveId={activeId} sidebarMenu={SidebarMenu}/>
               </Grid>
                <Grid item xs={10}>
                   <Container sx={{marginY:'20px'}}>
                          {baseComponents.map((item, index) => (
                                item.id ===activeId && (
                                    <CommonCard key={index} CardMain={item.component}  />

                                )
                            ))}
                   </Container>
                </Grid>
           </Grid>



        </>
    );
};

export default BaseLayout;
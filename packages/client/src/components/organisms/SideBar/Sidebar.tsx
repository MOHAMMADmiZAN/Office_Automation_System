import React, {useEffect, useLayoutEffect} from 'react';
import {Box, Divider, Grid, ListItem, ListItemIcon, ListItemText, MenuList} from "@mui/material";
import {SidebarBox} from "./styles/Sidebar.style";
import { NavLink} from "react-router-dom";


export interface SidebarMenuItem {
    icon: React.ReactNode;
    text: string;
    isDivider?: boolean;
    id: string;

}

interface SIDEBAR_PROPS {
    isSidebarOpen: boolean;
    ActiveUrl?: string;
    sidebarMenu: SidebarMenuItem[];


}


const Sidebar: React.FC<SIDEBAR_PROPS> = ({isSidebarOpen, ActiveUrl, sidebarMenu}) => {


    return (
        <>

              <SidebarBox className={isSidebarOpen ? 'open' : 'close'}>
                  <MenuList>
                      {sidebarMenu.map((item, index) => (
                          <Box key={index} sx={{margin: '2px 0',}} className={`Nav-item`}>
                              <NavLink  to={`/${item.id}`} className={ActiveUrl===`/${item.id}`?'Active-item':''}>
                                  <ListItemIcon>
                                      {item.icon}
                                  </ListItemIcon>
                                  <ListItemText primary={item.text}/>
                              </NavLink>
                              {item.isDivider && <Divider/>}
                          </Box>
                      ))}
                  </MenuList>
              </SidebarBox>



        </>
    );
};

export default Sidebar;
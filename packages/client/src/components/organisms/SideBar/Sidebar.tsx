import React from 'react';
import {Box, Divider, Grid, ListItem, ListItemIcon, ListItemText, MenuList} from "@mui/material";
import {SidebarBox} from "./styles/Sidebar.style";


export interface SidebarMenuItem {
    icon: React.ReactNode;
    text: string;
    isDivider?: boolean;
    id: string;

}

interface SIDEBAR_PROPS {
    isSidebarOpen: boolean;
    handleActiveId: (id: string) => void;
    ActiveId: string;
    sidebarMenu: SidebarMenuItem[];


}


const Sidebar: React.FC<SIDEBAR_PROPS> = ({isSidebarOpen, handleActiveId, ActiveId, sidebarMenu}) => {
    return (
        <>

              <SidebarBox className={isSidebarOpen ? 'open' : 'close'}>
                  <MenuList>
                      {sidebarMenu.map((item, index) => (
                          <Box key={index} sx={{margin: '2px 0',}}>
                              <ListItem button={true} onClick={() => handleActiveId(item.id)}
                                        className={ActiveId === item.id ? 'Active-item' : ''}>
                                  <ListItemIcon>
                                      {item.icon}
                                  </ListItemIcon>
                                  <ListItemText primary={item.text}/>
                              </ListItem>
                              {item.isDivider && <Divider/>}
                          </Box>
                      ))}
                  </MenuList>
              </SidebarBox>



        </>
    );
};

export default Sidebar;
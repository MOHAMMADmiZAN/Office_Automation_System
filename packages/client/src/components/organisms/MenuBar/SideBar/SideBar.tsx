import React, { useState } from 'react';
import {createBrowserRouter, Link} from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Box from '@mui/material/Box';

import PersonAdd from '@mui/icons-material/PersonAdd';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}




const SideBar: React.FC = (props: Props): JSX.Element => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const Menu = [
        {
          name: "Dashboard",
          slug: "/",
          submenu: false,
          icon: <PersonAdd fontSize="small" /> 
        },
        {
          name: "Email",
          slug: "/email",
          submenu: false,
          icon: <PersonAdd fontSize="small" />
        },
        {
            name: "Profile",
            slug: "/Profile",
            submenu: false,
            icon: <PersonAdd fontSize="small" />
          }
      ]


    const drawer = (
      <div>
        <Toolbar />
        <Divider />
        <List>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}

                {
                Menu.map( (elem, i ) => (
                    <Link to={elem.slug} key={i}>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon /> 
                                </ListItemIcon>
                                <ListItemText primary={elem.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ) )
                }
                


            </List>
            

      </div>
    );
  
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >

                <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                >
                {drawer}
                </Drawer>
                <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
                >
                {drawer}
                </Drawer>
            </Box>


        </>
    );
}

export default SideBar;
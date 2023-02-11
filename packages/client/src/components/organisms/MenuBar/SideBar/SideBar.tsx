import React, { useState } from 'react';
import {createBrowserRouter, Link} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import IconTooltip from '../../src/components/molecules/IconTooltip/IconTooltip';
import AppBar from '@mui/material/AppBar';
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
                    <Link to={elem.slug}>
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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
import React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import MenuBar from '../menu/menubar'


function IconTooltip(){

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const MenuItems = [
      {
        text: 'Profile',
        icon: <PersonAdd fontSize="small" />
      },
      {
        text: 'My Account',
        icon: <PersonAdd fontSize="small" />
      },
      {
        text: 'Logout',
        icon: <Logout fontSize="small" />
      }
    ]

    return(
        <>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
          <MenuBar anchorEl={anchorEl} handleClose={handleClose} menuItems={MenuItems} open={open} />
        
        
        </>
        
    )
}

export default IconTooltip;
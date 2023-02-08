import React, { memo, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';


interface Menu_Item{
    text: string;
    icon: React.ReactNode;
}

interface MENU_PROPS{
    anchorEl: HTMLElement | null;
    handleClose: () => void;
    menuItems: Menu_Item[];
    open: boolean;
}

const MenuBar: React.FC<MENU_PROPS> = ({anchorEl, handleClose, open, menuItems}): JSX.Element => {


    
    return(
        <>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
             >
                {
                    menuItems.map((item: Menu_Item, index: number) => {  
                        return(
                            <Box key={index}>
                                <MenuItem>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    {item.text}
                                </MenuItem>
                            </Box>
                        )
                    })
                    
                    }
            </Menu>
        </>
    );
};

export default memo(MenuBar);
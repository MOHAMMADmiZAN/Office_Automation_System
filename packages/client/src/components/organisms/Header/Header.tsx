import React, {memo, useState} from 'react';
import {
    Badge,
    Divider,
    Grid,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Tooltip,
    Typography,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Notifications} from "@mui/icons-material";
import logo from "../../../assets/vite.svg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {HeaderBox} from "./styles/Header.style";
import useAuth from "../../../hooks/useAuth";

interface HEADER_PROPS {
    controlSidebar: () => void;
    accountMenuItems: AccountMenuItem[];

}

export interface AccountMenuItem {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
    isDivider?: boolean;

}


const Header: React.FC<HEADER_PROPS> = ({controlSidebar, accountMenuItems}) => {
    const [accountMenu, setAccountMenu] = useState(false);
    const {user} = useAuth()
    const accountToggle = () => setAccountMenu((prevOpen) => !prevOpen);

    return (
        <HeaderBox>
            <Grid container={true} justifyContent={`space-between`}>
                <Grid item={true} xs={3} sm={2} md={2} lg={2} xl={2} textAlign={`left`}>
                    <IconButton onClick={controlSidebar}>
                        <MenuIcon/>
                    </IconButton>
                    <IconButton>
                        <img src={logo} alt={logo}/>
                    </IconButton>
                </Grid>
                <Grid item={true} xs={3} sm={2} md={2} lg={2} xl={2} textAlign={`right`}>
                    <Tooltip title="Notification">
                        <IconButton>
                            <Badge badgeContent={0} color="error" showZero={true}>
                                <Notifications color="action" sx={{margin: '0'}}/>
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <IconButton onClick={accountToggle}>
                        <Typography variant={`h6`} component={`h6`} color={`primary.main`}>{user.firstName}</Typography>
                        <AccountCircleIcon/>
                        {
                            accountMenu && (
                                <Paper sx={{position: 'fixed', right: '15px', top: '60px'}}>
                                    <MenuList>
                                        {
                                            accountMenuItems.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} onClick={item.onClick}>
                                                        <ListItemIcon>
                                                            {item.icon}
                                                        </ListItemIcon>
                                                        <ListItemText>{item.text}</ListItemText>
                                                        {item.isDivider && <Divider/>}
                                                    </MenuItem>
                                                )
                                            })

                                        }
                                    </MenuList>
                                </Paper>
                            )
                        }
                    </IconButton>
                </Grid>
            </Grid>
        </HeaderBox>
    );
};

export default memo(Header);
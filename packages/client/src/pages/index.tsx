import React, {useEffect} from 'react';
import FormInput from "../components/molecules/Form/FormInput";
import Btn from "../components/molecules/Form/Btn";
import {SubmitHandler, useForm} from "react-hook-form";
import {Container} from "@mui/material";
import {FormInputType} from "../components/molecules/Form/FormInput/Form_Input";


import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";






const Index: React.FC = (): JSX.Element => {
    const navigation = useNavigate();
    const {isAuth} = useAuth();
    useEffect(() => {
        if (!isAuth) {
          navigation("/login");
        }
       },[isAuth]);

    

    return (
        <>

        </>
    )
            


};

export default Index;
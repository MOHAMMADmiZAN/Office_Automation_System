import React from 'react';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';

// import IconTooltip from '../../src/components/molecules/IconTooltip/IconTooltip';
import MenuBar from '../../components/organisms/MenuBar/MenuBar';


import CssBaseline from '@mui/material/CssBaseline';



const drawerWidth = 240;


const MainLyout: React.FC = (): JSX.Element => {

    
    return (
        <>

            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <MenuBar />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Outlet />
                </Box>

            </Box>

        </>
    );
};

export default MainLyout;
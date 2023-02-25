import React from 'react';
import {Box, Button, Typography} from '@mui/material';

const primary = '#161618';


interface NOTFOUND_PROPS {

}


const NotFound: React.FC<NOTFOUND_PROPS> = () => {
    return (

        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    backgroundColor: primary,
                }}
            >
                <Typography variant="h1" style={{color: 'white'}}>
                    404
                </Typography>
                <Typography variant="h6" style={{color: 'white'}}>
                    The page you’re looking for doesn’t exist.
                </Typography>
                <Button variant="contained">Back Home</Button>
            </Box>
        </>

    );
};

export default NotFound;
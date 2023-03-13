import React from 'react';
import {Typography} from "@mui/material";
import useAuth from "../../hooks/useAuth";


const Index: React.FC = (): JSX.Element => {
    const {user} = useAuth();

    return (

        <>
            <Typography variant={`h1`} component={`h1`}>Welcome {user.firstName}</Typography>
        </>
    )


};

export default Index;
import React, {memo} from 'react';
import {Container, Grid} from "@mui/material";
import {AuthLayoutBox} from "./styles/Auth.Layout.Style";
import CommonCard from "../components/molecules/CommonCard/CommonCard";

interface AUTH_LAYOUT_PROPS {
    main: React.ReactNode;
    pageTitle?: string;

}

const AuthLayout: React.FC<AUTH_LAYOUT_PROPS> = ({main,pageTitle}): JSX.Element => {
    return (
        <AuthLayoutBox>
            <Container>
                <Grid container={true} justifyContent={`center`} alignItems={`center`} >
                    <Grid item={true} xs={12} sm={12} md={10} lg={10} xl={10}>
                       <CommonCard cardTitle={pageTitle} CardMain={main}/>
                    </Grid>
                </Grid>
            </Container>
        </AuthLayoutBox>


    );
};

export default memo(AuthLayout)
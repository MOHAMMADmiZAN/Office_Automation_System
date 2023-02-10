import React, {memo} from 'react';
import {Container, Divider, Grid} from "@mui/material";
import {AuthLayoutBox, AuthLayOutCard, AuthLayoutCardContent, AuthLayoutCardHeader} from "./styles/Auth.Layout.Style";

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
                        <AuthLayOutCard>
                            <AuthLayoutCardHeader title={pageTitle}/>
                            <Divider/>
                            <AuthLayoutCardContent>
                                {main}
                            </AuthLayoutCardContent>

                        </AuthLayOutCard>
                    </Grid>
                </Grid>
            </Container>

        </AuthLayoutBox>


    );
};

export default memo(AuthLayout)
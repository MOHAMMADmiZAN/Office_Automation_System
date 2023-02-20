import React from 'react';
import {useParams} from "react-router-dom";
import {Container, Grid} from "@mui/material";
import CommonCard from "../../../components/molecules/CommonCard/CommonCard";
import {useUsers} from "../../../hooks/useUsers";
import {useRole} from "../../../hooks/useRole";
import {useUserInfo} from "../../../hooks/useUserInfo";

interface USER_DETAILS_PROPS {

}

const UserDetails: React.FC<USER_DETAILS_PROPS> = (props): JSX.Element => {
    const {id} = useParams();
    const {Users}= useUsers()
    const user = Users?.find((u)=>u._id===id)
    const {Roles} = useRole()
    const userRole = Roles?.find((role)=>role._id===user?.role)
    const  {userBasicInfo} = useUserInfo()
    const userInfo = userBasicInfo?.find((info)=>info.user===user?._id)

    




    return (
        <>
            <Container>

                <CommonCard cardTitle={`${user?.firstName}'s Full Information`}>
                    <Grid container={true} justifyContent={`space-around`} alignItems={`center`}>

                    </Grid>

                </CommonCard>
            </Container>

        </>
    );
};

export default UserDetails;
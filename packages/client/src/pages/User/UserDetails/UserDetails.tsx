import {useParams} from "react-router-dom";
import {Box, Container, Divider, Grid, Link, Typography} from "@mui/material";
import CommonCard from "../../../components/molecules/CommonCard/CommonCard";

import React from "react";
import {headerTypography, userAvatarStyle} from "./UserDetails.style";
import moment from "moment";
import {Downloading, Edit} from "@mui/icons-material";
import CustomModal from "../../../components/organisms/CustomModal/CustomModal";
import {Btn} from "../../../components/molecules/Form/Btn/Btn";
import EditUserDetails from "./EditUserDetails/EditUserDetails";
import useUser from "../../../hooks/useUser";


interface USER_DETAILS_PROPS {

}

const UserDetails: React.FC<USER_DETAILS_PROPS> = (props): JSX.Element => {
    const {id} = useParams();
    const {user,userInfo,userDocument,userRole,onBoard} = useUser(id as string)


    let age = moment.duration(moment().diff(userInfo?.dateOfBirth));
    let ageInYears = age.years();
    let ageInMonths = age.months();
    let ageInDays = age.days();



    return (
        <>
            <Container>
                <CommonCard cardTitle={`${user?.firstName}'s Full Information`}>
                    <Grid container={true} justifyContent={`space-between`} alignItems={`center`}>
                        <Grid item={true} xs={12} md={3} alignItems={`center`}>
                            <Box sx={{...userAvatarStyle}}>
                                <img src={user?.avatar} alt={user?.avatar}/>
                            </Box>
                        </Grid>
                        <Grid item={true} xs={12} md={8}>
                            <Grid container={true} justifyContent={`space-between`} alignItems={`center`}>
                                <Grid item={true} xs={12} md={12}>
                                    <Typography variant={`h2`}> Full Name
                                        : {user?.firstName} {user?.lastName}</Typography>
                                </Grid>
                                <Grid item={true} xs={12} md={6}>
                                    <Typography variant={`subtitle1`}> Designation : {onBoard?.jobTitle}</Typography>
                                </Grid>
                                <Grid item={true} xs={12} md={4}>
                                    <Typography variant={`subtitle2`}> Age : {`${ageInYears} Years ${ageInMonths} Months ${ageInDays} Days`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item={true} xs={12} md={4}>
                            <CustomModal modalId={"edit-user-data"} modalContent={<EditUserDetails userId={id as string}/>} modalBtnText={`Edit User`} ModalBtnIcon={<Edit/>} modalBtnVariant={`outlined`} modalTitle={`edit-user-data`}/>
                            <Btn BtnStartIcon={<Downloading/>} BtnText={`Download `}  variant={`contained`}/>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container={true} justifyContent={`space-between`} alignItems={`center`}>
                        <Grid item={true} xs={12} md={8}>
                            <Typography variant={`h3`} sx={{...headerTypography}}>Contact Information</Typography>
                        </Grid>
                        <Grid item={true} xs={12} md={8} my={`5px`}>
                            <Typography variant={`h5`}> Email : {user?.email}</Typography>
                        </Grid>
                        <Grid item={true} xs={12} md={6} my={`5px`}>
                            <Typography variant={`h5`}> Contact Number : {userInfo?.contactNumber}</Typography>
                        </Grid>
                        <Grid item={true} xs={12} md={6} my={`5px`}>
                            <Typography variant={`h5`}>Emergency Contact Number
                                : {userInfo?.eContactNumber}</Typography>
                        </Grid>
                        <Grid item={true} xs={12} md={6}>
                            <Typography variant={`h5`}> Present Address : {userInfo?.presentAddress}</Typography>
                        </Grid>
                        <Grid item={true} xs={12} md={6} my={`5px`}>
                            <Typography variant={`h5`}> Permanent Address : {userInfo?.permanentAddress}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container={true} justifyContent={`space-between`} alignItems={`center`}>
                        <Grid item={true} xs={12} md={8}>
                            <Typography variant={`h3`} sx={{...headerTypography}}>On Boarding Data</Typography>
                        </Grid>
                        <Grid item={true} xs={12} md={8} my={`5px`}>
                            <Typography variant={`h5`}> Joining Date: {moment(onBoard?.joiningDate).calendar()}</Typography>
                        </Grid>
                        <Grid item={true} xs={12} md={6} my={`5px`}>
                            <Typography variant={`h5`}> Salary : ${onBoard?.salary}</Typography>
                        </Grid>
                        <Grid item={true} xs={12} md={6} my={`5px`}>
                            <Typography variant={`h5`}>Working Status : {onBoard?.status}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container={true} justifyContent={`space-between`} alignItems={`center`}>
                        <Grid item={true} xs={12} md={8}>
                            <Typography variant={`h3`} sx={{...headerTypography}}>  Documents</Typography>
                        </Grid>
                        {
                            userDocument?.map((doc,i) => (
                                <Grid item={true} xs={12} md={8} my={`5px`} key={i}>
                                    <Typography variant={`h5`}> Document Title: <Link href={doc?.document} >{doc?.title} <Downloading/></Link></Typography>
                                </Grid>
                            ))

                        }

                    </Grid>


                </CommonCard>
            </Container>
        </>
    );
};

export default UserDetails;
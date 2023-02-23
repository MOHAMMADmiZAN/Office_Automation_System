import {useParams} from "react-router-dom";
import {Box, Container, Divider, Grid, Link, Typography} from "@mui/material";
import CommonCard from "../../../components/molecules/CommonCard/CommonCard";
import {useUsers} from "../../../hooks/useUsers";
import {useRole} from "../../../hooks/useRole";
import {useUserInfo} from "../../../hooks/useUserInfo";

import React from "react";
import {headerTypography, userAvatarStyle} from "./UserDetails.style";
import {useOnBoard} from "../../../hooks/useOnBoard";
import moment from "moment";
import {useDocument} from "../../../hooks/useDocument";
import {Downloading, Edit} from "@mui/icons-material";
import CustomModal from "../../../components/organisms/CustomModal/CustomModal";
import {Btn} from "../../../components/molecules/Form/Btn/Btn";

interface USER_DETAILS_PROPS {

}

const UserDetails: React.FC<USER_DETAILS_PROPS> = (props): JSX.Element => {
    const {id} = useParams();
    const {Users} = useUsers()
    const user = Users?.find((u) => u._id === id)
    const {Roles} = useRole()
    const userRole = Roles?.find((role) => role._id === user?.role)
    const {userBasicInfo} = useUserInfo()
    const userInfo = userBasicInfo?.find((info) => info.user === user?._id)
    const {OnBoardData} = useOnBoard()
    const onBoard = OnBoardData?.find((onBoard) => onBoard.user === user?._id)
        const {userAllDocument} = useDocument()
        const userDocument = userAllDocument?.filter((doc) => doc.user === user?._id)

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
                            <CustomModal modalId={"edit-user-data"} modalContent={undefined} modalBtnText={`Edit User`} ModalBtnIcon={<Edit/>} modalBtnVariant={`outlined`} modalTitle={`edit-user-data`}/>
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
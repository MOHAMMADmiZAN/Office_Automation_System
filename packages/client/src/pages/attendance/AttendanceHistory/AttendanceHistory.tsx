import moment from 'moment';
import React, {useEffect, useState} from 'react';
import useAttendance from "../../../hooks/useAttendance";
import {AttendanceBox, AttendanceTypography} from "../styles/attendance.style";
import {IAttendancePayload} from "../../../api/Attendance";
import Btn from "../../../components/molecules/Form/Btn";
import {Box} from "@mui/material";

interface ATTENDANCE_HISTORY_PROPS {}

const AttendanceHistory: React.FC<ATTENDANCE_HISTORY_PROPS> = (props): JSX.Element => {
    const {userAttendanceByUser, userStatusCount, userAttendanceByStatus} = useAttendance();
    const [attendanceHistory, setAttendanceHistory] = useState<IAttendancePayload[] | null>(null);


    useEffect(() => {
        if (userAttendanceByUser) {
            setAttendanceHistory(userAttendanceByUser);
        }
    }, [userAttendanceByUser]);

    const handleAttendanceHistory = async (status: string) => {
        const attendanceHistory = await userAttendanceByStatus(status);
        setAttendanceHistory(attendanceHistory!);
        console.log(status, attendanceHistory)
    };

    return (
        <>
            {
                userStatusCount && (
                    <Box display={`flex`}>
                        {Object.keys(userStatusCount).map((status ,i) => (
                            // @ts-ignore
                            <Btn variant={`outlined`} styles={{margin:'5px'}} BtnText={`${status}: ${userStatusCount?.[status]} Days`} onClick={() => handleAttendanceHistory(status)} key={i} />
                        ))}
                    </Box>
                )
            }
            {attendanceHistory ? (
                attendanceHistory.map((attendance, index) => (
                    <AttendanceBox key={index}>
                        <AttendanceTypography variant="h6">Attendance No: {attendance.adminAttendance}</AttendanceTypography>
                        <AttendanceTypography variant="h6">Attendance Status: {attendance.status}</AttendanceTypography>
                        <AttendanceTypography variant="h6">Check In Time : {moment(attendance.checkIn).calendar()}</AttendanceTypography>
                        <AttendanceTypography variant="h6">Check Out Time : {moment(attendance.checkOut).calendar()}</AttendanceTypography>
                    </AttendanceBox>
                ))
            ) : (
                <AttendanceTypography variant="h6">No Attendance History</AttendanceTypography>
            )}
        </>
    );
};

export default AttendanceHistory;
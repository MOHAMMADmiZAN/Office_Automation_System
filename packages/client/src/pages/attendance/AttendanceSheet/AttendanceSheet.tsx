import React from 'react';
import useAttendance from "../../../hooks/useAttendance";
import {AttendanceBox, AttendanceTypography} from "../styles/attendance.style";

interface ATTENDANCE_SHEET_PROPS {

}

const AttendanceSheet: React.FC<ATTENDANCE_SHEET_PROPS> = (props): JSX.Element => {
     const {adminAttendance,userCountOnAttendance} = useAttendance()
    return (
        <>
            {adminAttendance && adminAttendance.map((attendance, index) => (
                <AttendanceBox key={index}>
                    <AttendanceTypography variant="h6">Attendance No: {attendance._id}</AttendanceTypography>
                    <AttendanceTypography variant="h6">Attendance Status: {attendance.status}</AttendanceTypography>
                    <AttendanceTypography variant="h6">Attended Users Count : {userCountOnAttendance(attendance._id as string)} </AttendanceTypography>
                </AttendanceBox>


            ))

            }
            
        </>
    );
};

export default AttendanceSheet;
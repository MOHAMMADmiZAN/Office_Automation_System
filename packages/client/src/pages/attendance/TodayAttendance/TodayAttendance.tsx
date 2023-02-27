import React from 'react';
import useAttendance, {IAttendancePayloadWithAttendanceId} from "../../../hooks/useAttendance";
import {AttendanceActionBox, AttendanceBox, AttendanceTypography} from "../styles/attendance.style";
import moment from "moment/moment";
import CheckIcon from '@mui/icons-material/Check';
import Btn from "../../../components/molecules/Form/Btn";
import useAuth from "../../../hooks/useAuth";
import {IAttendancePayload} from "../../../api/Attendance";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockClockIcon from '@mui/icons-material/LockClock';

interface ACTIVE_ATTENDANCE_PROPS {

}

const TodayAttendance: React.FC<ACTIVE_ATTENDANCE_PROPS> = (props): JSX.Element => {
    const {TodayAttendance, checkIn, checkOut, TodayUserAttendance, disableAttendance} = useAttendance()
    const {userId} = useAuth()

    const isTimeUP = moment(TodayAttendance?.createdAt).add(TodayAttendance?.timeLimit, 'minutes').isBefore(moment())


    const handleCheckIn = async (id: string) => {
        const CheckInPayload = {
            user: userId,
            adminAttendance: id,
            checkIn: new Date(),
            status: 'Present'


        }
        await checkIn(CheckInPayload  as IAttendancePayload)
    }
    const handleCheckOut = async () => {

        const CheckOutPayload = {
            id: TodayUserAttendance?._id || "",
            payload: {
                ...TodayUserAttendance,
                checkOut: new Date(),
            }
        }
        await checkOut(CheckOutPayload as IAttendancePayloadWithAttendanceId)

    }
    const handleDisableAttendance = async () => {

        await disableAttendance()

    }

    const handleLateCheckIn = async (id: string) => {

        const CheckInPayload = {
            user: userId,
            adminAttendance: id,
            checkIn: new Date(),
            status: 'Late',
            comment: 'Late Check In'
        }
        await checkIn(CheckInPayload  as IAttendancePayload)
    }


    return (
        <>
            {TodayAttendance ? (
                <>{TodayAttendance.status === 'RUNNING' &&
                    <Btn variant={`outlined`} BtnText={`disableAttendance`} onClick={handleDisableAttendance}/>}

                    <AttendanceBox>
                        <AttendanceTypography gutterBottom>Attendance No: {TodayAttendance?._id}</AttendanceTypography>
                        <AttendanceTypography
                            gutterBottom> Date: {moment(TodayAttendance?.createdAt).format('DD-MM-YYYY')}</AttendanceTypography>
                        <AttendanceTypography> Status: {TodayAttendance?.status}</AttendanceTypography>
                        <AttendanceActionBox>
                            {!TodayUserAttendance?.checkOut && TodayUserAttendance?.checkIn && !isTimeUP && (
                                <Btn BtnText={`Check Out`} variant={`outlined`} BtnStartIcon={<ExitToAppIcon/>}
                                     onClick={handleCheckOut}/>
                            )}
                            {!TodayUserAttendance && !isTimeUP && (
                                <Btn BtnText={`Check In`} variant={`outlined`} BtnStartIcon={<CheckIcon/>}
                                     onClick={() => handleCheckIn(TodayAttendance?._id as string)}/>
                            )}
                            {!TodayUserAttendance && isTimeUP && (
                                <Btn BtnText={`Late Check In`} variant={`outlined`} BtnStartIcon={<LockClockIcon/>}
                                     onClick={() => handleLateCheckIn(TodayAttendance?._id as string)}/>
                            )}
                        </AttendanceActionBox>
                    </AttendanceBox>
                </>
            ) : <AttendanceTypography>No Attendance In Today </AttendanceTypography>}
        </>
    )


}

export default TodayAttendance;
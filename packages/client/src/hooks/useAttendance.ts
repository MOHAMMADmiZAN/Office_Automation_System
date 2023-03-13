import {useMutation, useQuery, useQueryClient} from "react-query";
import AttendanceApi, {IAttendancePayload} from "../api/Attendance.api";
import AdminAttendanceApi, {IAdminAttendancePayload} from "../api/AdminAttendance.api";
import useAuth from "./useAuth";
import moment from "moment";


export interface IAttendancePayloadWithAttendanceId {
    id: string;
    payload: IAttendancePayload;
}

export type StatusType = 'Present' | 'Absent' | 'Leave' | 'HalfDay' | 'Weekend' | 'Late' | 'Holiday';

export interface IUserStatusCount {
    [key: string]: number;
}




const useAttendance = () => {
    const {userId} = useAuth()

    const queryClient = useQueryClient()
    const {data: adminAttendance} = useQuery<IAdminAttendancePayload[]>('allAdminAttendance', AdminAttendanceApi.adminAttendanceFindAll)
    const {data: userAttendance} = useQuery<IAttendancePayload[]>('allUserAttendance', AttendanceApi.attendanceFindAll)

    const RunningAttendance = adminAttendance?.find((item) => item.status === 'RUNNING')
    const TodayAttendance = adminAttendance?.find((item) => moment(item.createdAt).isSame(moment(), 'day'))
    const TodayUserAttendance = userAttendance?.find((item) => moment(item.checkIn).isSame(moment(), 'day') && item.user === userId && item.adminAttendance === TodayAttendance?._id)

    const {data: userAttendanceByUser} = useQuery<IAttendancePayload[]>(['allUserAttendanceByUser', userId], {
            queryFn: () => AttendanceApi.attendanceFindByUser(userId!)
        }
    )
    const userCountOnAttendance = (id: string) => {
        return userAttendance?.filter((item) => item.adminAttendance === id).length

    }

    const userStatusCount = userAttendanceByUser?.reduce((acc: IUserStatusCount, item) => {
        if (item.status) {
            acc[item.status] = acc[item.status] + 1
        }
        return acc
    }, {Present: 0, Late: 0, Absent: 0, HalfDay: 0, Leave: 0, Weekend: 0, Holiday: 0})


    const {mutateAsync: disableAttendance} = useMutation(AdminAttendanceApi.adminAttendanceDisableWhenCalled, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('allAdminAttendance')

        }
    })
    const {mutateAsync: checkIn} = useMutation((data: IAttendancePayload) => AttendanceApi.attendanceCreate(data), {
        onSuccess: async () => {
            await queryClient.invalidateQueries('allUserAttendance')
            await queryClient.invalidateQueries('allUserAttendanceByUser')

        }
    })
    const {mutateAsync: checkOut} = useMutation((data: IAttendancePayloadWithAttendanceId) => AttendanceApi.attendanceUpdate(data.payload, data.id), {
        onSuccess: async () => {
            await queryClient.invalidateQueries('allUserAttendance')
            await queryClient.invalidateQueries('allUserAttendanceByUser')

        }
    })

    const userAttendanceByStatus = (status: string) => {
        return userAttendanceByUser?.filter((item) => item.status === status)
    }

    return {
        adminAttendance,
        userAttendance,
        userAttendanceByUser,
        disableAttendance,
        checkIn,
        checkOut,
        RunningAttendance,
        TodayAttendance,
        TodayUserAttendance,
        userStatusCount,
        userAttendanceByStatus,
        userCountOnAttendance

    }

}


export default useAttendance
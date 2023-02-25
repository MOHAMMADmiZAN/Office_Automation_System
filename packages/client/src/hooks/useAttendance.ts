import {useMutation, useQuery, useQueryClient} from "react-query";
import AttendanceApi, {IAttendancePayload} from "../api/Attendance";
import AdminAttendanceApi, {IAdminAttendancePayload} from "../api/AdminAttendance";
import useAuth from "./useAuth";
import moment from "moment";


export interface IAttendancePayloadWithAttendanceId {
    id: string;
    payload: IAttendancePayload;
}

const useAttendance = () => {
    const {userId} = useAuth()

    const queryClient = useQueryClient()
    const {data: adminAttendance} = useQuery<IAdminAttendancePayload[]>('allAdminAttendance', AdminAttendanceApi.adminAttendanceFindAll)
    const {data: userAttendance} = useQuery<IAttendancePayload[]>('allUserAttendance', AttendanceApi.attendanceFindAll)

    const RunningAttendance = adminAttendance?.find((item) => item.status === 'RUNNING')
    const TodayAttendance = adminAttendance?.find((item) => moment(item.createdAt).isSame(moment(), 'day'))
    const TodayUserAttendance = userAttendance?.find((item) => moment(item.checkIn).isSame(moment(), 'day'))


    // if userId is not undefined then fetch attendance by user
    const {data: userAttendanceByUser} = useQuery<IAttendancePayload[]>(['allUserAttendanceByUser', userId], {
            queryFn: () => AttendanceApi.attendanceFindByUser(userId!)
        }
    )

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


    return {
        adminAttendance,
        userAttendance,
        userAttendanceByUser,
        disableAttendance,
        checkIn,
        checkOut,
        RunningAttendance,
        TodayAttendance,
        TodayUserAttendance

    }

}


export default useAttendance
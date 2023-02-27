import {useMutation, useQuery, useQueryClient} from "react-query";
import AttendanceApi, {IAttendancePayload} from "../api/Attendance";
import AdminAttendanceApi, {IAdminAttendancePayload} from "../api/AdminAttendance";
import useAuth from "./useAuth";
import moment from "moment";


export interface IAttendancePayloadWithAttendanceId {
    id: string;
    payload: IAttendancePayload;
}

export type StatusType = 'Present' | 'Absent' | 'Leave' | 'HalfDay' | 'Weekend' | 'Late' | 'Holiday';

export interface IUserStatusCount {
    [status: string]: number;
    Present: number;
    Late: number;
    Absent: number;
    HalfDay: number;
    Leave: number;
    Weekend: number;
    Holiday: number;

}


const useAttendance = () => {
    const {userId} = useAuth()

    const queryClient = useQueryClient()
    const {data: adminAttendance} = useQuery<IAdminAttendancePayload[]>('allAdminAttendance', AdminAttendanceApi.adminAttendanceFindAll)
    const {data: userAttendance} = useQuery<IAttendancePayload[]>('allUserAttendance', AttendanceApi.attendanceFindAll)

    const RunningAttendance = adminAttendance?.find((item) => item.status === 'RUNNING')
    const TodayAttendance = adminAttendance?.find((item) => moment(item.createdAt).isSame(moment(), 'day'))
    const TodayUserAttendance = userAttendance?.find((item) => moment(item.checkIn).isSame(moment(), 'day') && item.user === userId)


    // if userId is not undefined then fetch attendance by user
    const {data: userAttendanceByUser} = useQuery<IAttendancePayload[]>(['allUserAttendanceByUser', userId], {
            queryFn: () => AttendanceApi.attendanceFindByUser(userId!)
        }
    )
     const userCountOnAttendance = (id:string)=>{
        return userAttendanceByUser?.filter((item)=>item.adminAttendance===id).length

     }

     // now count status of userAttendanceByUser use reduce
    const userStatusCount = userAttendanceByUser?.reduce((acc: IUserStatusCount, item) => {
        if (item.status) {
            acc[item.status] = acc[item.status] + 1
        }
        return acc
    },{Present: 0, Late: 0, Absent: 0, HalfDay: 0, Leave: 0, Weekend: 0, Holiday: 0})



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
  //  create  user Attendance filter function  by AttandanceStatus  form userAttendanceByUser  which return  array of IAttendancePayload
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
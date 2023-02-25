import {PrivateApiInstance} from "./api";

export interface IAttendancePayload {
    _id?: string;
    user: string;
    adminAttendance: string;
    checkIn: Date;
    checkOut?: Date;
    status?: string;
    comment?: string;

}

interface IAttendanceApi {
    attendanceCreate: (data: IAttendancePayload) => Promise<IAttendancePayload>;
    attendanceBYId: (id: string) => Promise<IAttendancePayload | null>;
    attendanceFindAll: () => Promise<IAttendancePayload[]>;
    attendanceUpdate: (data: IAttendancePayload, id: string) => Promise<IAttendancePayload | null>;
    attendanceDelete: (id: string) => Promise<IAttendancePayload | null>;
    attendanceFindByUser: (id: string) => Promise<IAttendancePayload[]>;


}


const AttendanceApi: IAttendanceApi = {
    attendanceCreate: (data: IAttendancePayload) => {
        return PrivateApiInstance.post('/attendance', data)
    },
    attendanceBYId: (id: string) => {
        return PrivateApiInstance.get(`/attendance/${id}`)
    },
    attendanceFindAll: async () => {
        const res = await PrivateApiInstance.get('/attendance')
        return res.data.data
    },
    attendanceUpdate: (data: IAttendancePayload, id: string) => {
        return PrivateApiInstance.put(`/attendance/${id}`, data)
    },
    attendanceDelete: (id: string) => {
        return PrivateApiInstance.delete(`/attendance/${id}`)
    },
    attendanceFindByUser: (id: string) => {
        return PrivateApiInstance.get(`/attendance/user/${id}`)
    }


}


export default AttendanceApi
import {PrivateApiInstance} from "./api";

export interface IAdminAttendancePayload {
    _id?: string;
    status: string;
    timeLimit: string;
    createdAt?: string;
    updatedAt?: string;
}

interface IAdminAttendanceApi {
    adminAttendanceCreate: (data: IAdminAttendancePayload) => Promise<IAdminAttendancePayload>;
    adminAttendanceBYId: (id: string) => Promise<IAdminAttendancePayload | null>;
    adminAttendanceFindAll: () => Promise<IAdminAttendancePayload[]>;
    adminAttendanceUpdate: (data: IAdminAttendancePayload, id: string) => Promise<IAdminAttendancePayload | null>;
    adminAttendanceDelete: (id: string) => Promise<IAdminAttendancePayload | null>;

    adminAttendanceDisableWhenCalled: () => Promise<IAdminAttendancePayload | null>;
}

const AdminAttendanceApi: IAdminAttendanceApi = {
    adminAttendanceCreate: (data: IAdminAttendancePayload) => {
        return PrivateApiInstance.post('/admin-attendance', data)
    },

    adminAttendanceBYId: (id: string) => {
        return PrivateApiInstance.get(`/admin-attendance/${id}`)
    },
    adminAttendanceFindAll: async () => {
        let response = await PrivateApiInstance.get('/admin-attendance')
        return response.data.data
    },
    adminAttendanceUpdate: (data: IAdminAttendancePayload, id: string) => {
        return PrivateApiInstance.put(`/admin-attendance/${id}`, data)
    },
    adminAttendanceDelete: (id: string) => {
        return PrivateApiInstance.delete(`/admin-attendance/${id}`)
    },
    adminAttendanceDisableWhenCalled: () => {
        return PrivateApiInstance.post(`/admin-attendance/disable`)
    }
}

export default AdminAttendanceApi
import {PrivateApiInstance} from "./api";


export interface ILeavePayload {
    _id?: string;
    user?: string;
    leaveType: string;
    leaveReason: string;
    leaveStartDate: string;
    leaveEndDate: string;
    leaveStatus: string;
    leaveComment: string;
    leaveAttachment?: string;
    requestToResponse: string;
    requestToResponseComment?: string;

}

interface ILeaveApi {
    leaveList: () => Promise<ILeavePayload[]>;
    leaveCreate: (payload: ILeavePayload) => Promise<ILeavePayload>;
    leaveUpdate: (payload: ILeavePayload, id: string) => Promise<ILeavePayload>;
    leaveDelete: (id: string) => Promise<ILeavePayload>;
}

const LeaveApi: ILeaveApi = {
    leaveList: async () => {
        const response = await PrivateApiInstance.get('/leave');
        return response.data.data;
    },
    leaveCreate: async (payload: ILeavePayload) => {
        const response = await PrivateApiInstance.post('/leave', payload);
        return response.data;
    },
    leaveUpdate: async (payload: ILeavePayload, id: string) => {
        const response = await PrivateApiInstance.put(`/leave/${id}`, payload);
        return response.data;
    },
    leaveDelete: async (id: string) => {
        const response = await PrivateApiInstance.delete(`/leave/${id}`);
        return response.data;
    }
}

export default LeaveApi;
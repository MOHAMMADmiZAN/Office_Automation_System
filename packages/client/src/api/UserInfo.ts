import {PrivateApiInstance} from "./api";

export interface IUserInfoPayload {
    permanentAddress: string,
    presentAddress: string,
    contactNumber: string,
    user: string,
    dateOfBirth: string,
    eContactNumber: string,
}

export interface IUserInfoPayloadWithId extends IUserInfoPayload {
    _id: string

}

interface IUserInfo {
    getAllUserInfo: () => Promise<IUserInfoPayloadWithId[]>,
    getUserInfo: (id: string) => Promise<IUserInfoPayloadWithId>,
    updateUserInfo: (id: string, payload: IUserInfoPayload) => Promise<IUserInfoPayloadWithId>,
    deleteUserInfo: (id: string) => Promise<IUserInfoPayloadWithId>,
    createUserInfo: (payload: IUserInfoPayload) => Promise<IUserInfoPayloadWithId>,
}

const UserInfo: IUserInfo = {
    getAllUserInfo: async () => {
        const response = await PrivateApiInstance.get('/userbasicinfo')

        return response.data.data;
    },
    getUserInfo: async (id: string) => {
        const response = await PrivateApiInstance.get(`/userbasicinfo/${id}`)
        return response.data.data;
    },
    updateUserInfo: async (id: string, payload: IUserInfoPayload) => {
        const response = await PrivateApiInstance.put(`/userbasicinfo/${id}`, payload)
        return response.data;
    },
    deleteUserInfo: async (id: string) => {
        const response = await PrivateApiInstance.delete(`/userbasicinfo/${id}`)
        return response.data.data;
    },
    createUserInfo: async (payload: IUserInfoPayload) => {

        const response = await PrivateApiInstance.post(`/userbasicinfo`, payload)
        return response.data.data;
    }

}

export default UserInfo
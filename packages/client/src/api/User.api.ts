import {PrivateApiInstance} from "./api";
import {User} from "../store/models/AuthModel";


export const UserApi = {
    getUser: async (id: string) => {
        try {
            const response = await PrivateApiInstance.get(`/user/${id}`);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    },
    updateUser: async (id: string, payload: User) => {
        try {
            const headers = { 'Content-Type': 'multipart/form-data' };

            const response = await PrivateApiInstance.put(`/user/${id}`, payload,{ headers });
            return response.data;
        } catch (e) {
            console.log(e)
        }
    },
    deleteUser: async (id: string) => {
        try {
            const response = await PrivateApiInstance.delete(`/user/${id}`);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    },
    getAllUsers: async () => {
        try {
            const response = await PrivateApiInstance.get(`/user`);
            return response.data.data;
        } catch (e) {
            console.log(e)
        }
    },
    updateUserAvatar: async (id: string, payload: Blob) => {
        try {
            const headers = { 'Content-Type': 'multipart/form-data' };
            const response = await PrivateApiInstance.put(`/user/changeAvatar/${id}`, payload,{ headers });
            console.log(response)
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }



}
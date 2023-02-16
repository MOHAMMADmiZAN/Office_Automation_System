import {PrivateApiInstance} from "./api";



export const UserApi = {
    getUser: async (id: string) => {
        try {
            const response = await PrivateApiInstance.get(`/user/${id}`);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    },
    updateUser: async (id: string, payload: any) => {
        try {
            const response = await PrivateApiInstance.put(`/user/${id}`, payload);
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
    }

}
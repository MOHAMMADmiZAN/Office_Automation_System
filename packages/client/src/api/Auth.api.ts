import {loginPayload, registerPayload} from "../store/models/AuthModel";
import {PublicApiInstance} from "./api";


export const AuthApi = {
    login: async (payload: loginPayload) => {
        try {
            const response = await PublicApiInstance.post('/auth/login', payload);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    },
    register: async (payload: registerPayload) => {
        try {
            console.log(payload)
            const headers = { 'Content-Type': 'multipart/form-data' };
            const response = await PublicApiInstance.post('/auth/register', payload, { headers });
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

}
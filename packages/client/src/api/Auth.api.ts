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
            const response = await PublicApiInstance.post('/auth/register', payload);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

}
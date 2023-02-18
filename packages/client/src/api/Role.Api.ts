import {PrivateApiInstance} from "./api";
import Helper from "../utils/helper";
import {AxiosError} from "axios";
import {handleErrors, handleSuccess} from "../utils/alertMessage";

export interface IRolePayload {
    name: string;
}
interface IRoleApi {
    roleList: () => Promise<IRolePayload[]>;
    roleCreate: (payload: IRolePayload) => Promise<IRolePayload>;
    roleUpdate: (payload: IRolePayload, id: string) => Promise<IRolePayload>;
    roleDelete: (id: string) => Promise<IRolePayload>;


}
const helperFunc = new Helper();

export const RoleApi: IRoleApi = {
    roleList: async () => {
        const response = await PrivateApiInstance.get('/role');
        return response.data.data;

    },
    roleCreate: async (payload: IRolePayload) => {
        const response = await PrivateApiInstance.post('/role', payload);
        return response.data;


    },
    roleUpdate: async (payload: IRolePayload, id: string) => {
        const response = await PrivateApiInstance.put(`/role/${id}`, payload);
        return response.data;
    },
    roleDelete: async (id: string) => {
        const response = await PrivateApiInstance.delete(`/role/${id}`);
        return response.data;
    }
}
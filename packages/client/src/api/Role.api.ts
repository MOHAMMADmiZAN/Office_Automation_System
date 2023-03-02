import {PrivateApiInstance} from "./api";

export interface IRolePayload {
    name: string;
}

export interface IRoleWithId extends IRolePayload {
    _id: string;
}

interface IRoleApi {
    roleList: () => Promise<IRoleWithId[]>;
    roleCreate: (payload: IRolePayload) => Promise<IRolePayload>;
    roleUpdate: (payload: IRolePayload, id: string) => Promise<IRolePayload>;
    roleDelete: (id: string) => Promise<IRolePayload>;
    roleById: (id: string) => Promise<IRoleWithId>;
}


export const RoleApi: IRoleApi = {
    roleList: async () => {
        const response = await PrivateApiInstance.get('/role');
        return response.data.roles;

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
    },
    roleById: async (id: string) => {
        const response = await PrivateApiInstance.get(`/role/${id}`);
        return response.data.data;
    }
}
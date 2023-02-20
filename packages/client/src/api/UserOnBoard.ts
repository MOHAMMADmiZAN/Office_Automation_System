import {PrivateApiInstance} from "./api";

export interface IUserOnBoardPayload {
    user: string;
    joiningDate: string;
    jobTitle: string;
    salary: number;
    status: string;
    farewellDate?: string;

}

export interface IUserOnBoardWithId extends IUserOnBoardPayload {
    _id: string;
}

interface IUserOnBoardApi {
    userOnBoardList: () => Promise<IUserOnBoardWithId[]>;
    userOnBoardCreate: (payload: IUserOnBoardPayload) => Promise<IUserOnBoardPayload>;
    userOnBoardUpdate: (payload: IUserOnBoardPayload, id: string) => Promise<IUserOnBoardPayload>;
    userOnBoardDelete: (id: string) => Promise<IUserOnBoardPayload>;
    userOnBoardById: (id: string) => Promise<IUserOnBoardWithId>;

}


export const UserOnBoardApi: IUserOnBoardApi = {
    userOnBoardList: async () => {
        const response = await PrivateApiInstance.get('/onboard');
        return response.data.data;
    },
    userOnBoardCreate: async (payload: IUserOnBoardPayload) => {
        const response = await PrivateApiInstance.post('/onboard', payload);
        return response.data;
    },
    userOnBoardUpdate: async (payload: IUserOnBoardPayload, id: string) => {
        const response = await PrivateApiInstance.put(`/onboard/${id}`, payload);
        return response.data;
    },
    userOnBoardDelete: async (id: string) => {
        const response = await PrivateApiInstance.delete(`/onboard/${id}`);
        return response.data;
    },
    userOnBoardById: async (id: string) => {
        const response = await PrivateApiInstance.get(`/onboard/${id}`);
        return response.data.data;
    }

}
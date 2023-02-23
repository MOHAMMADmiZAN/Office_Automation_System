import {PrivateApiInstance} from "./api";


export interface IUserDocument {
    title: string;
    document: string;
    user: string;
}

export interface IUserDocumentWithId extends IUserDocument {
    _id: string;
}

interface IUserDocumentApi {
    userDocumentList: () => Promise<IUserDocumentWithId[]>;
    userDocumentCreate: (payload: IUserDocument) => Promise<IUserDocumentWithId>;
    userDocumentUpdate: (payload: IUserDocument, id: string) => Promise<IUserDocumentWithId>;
    userDocumentDelete: (id: string) => Promise<IUserDocumentWithId>;
}

export const UserDocumentApi: IUserDocumentApi = {
    userDocumentList: async () => {
        const response = await PrivateApiInstance.get('/user-document');
        return response.data.data;

    },
    userDocumentCreate: async (payload: IUserDocument) => {
        const response = await PrivateApiInstance.post('/user-document', payload,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    userDocumentUpdate: async (payload: IUserDocument, id: string) => {
        const response = await PrivateApiInstance.put(`/user-document/${id}`, payload);
        return response.data;
    },
    userDocumentDelete: async (id: string) => {
        const response = await PrivateApiInstance.delete(`/user-document/${id}`);
        return response.data;
    }
}
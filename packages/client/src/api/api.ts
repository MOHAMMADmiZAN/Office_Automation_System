import axios from "axios";
import { handleErrors, handleSuccess } from "../utils/alertMessage";

export const BackendBaseURL = `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/v1`;

const apiConfig = {
    baseURL: BackendBaseURL,
};

const PublicApiInstance = axios.create(apiConfig);


PublicApiInstance.interceptors.response.use(
    (response) => {
        if (response.config.method !== 'get') {
            handleSuccess(response.data.message);
        }
        return response;
    },
    (error) => {
        handleErrors(error);
    }
);

const PrivateApiInstance = axios.create(apiConfig);

PrivateApiInstance.interceptors.request.use(
    (config) => {
        const jwtToken = JSON.parse(
            localStorage.getItem('[EasyPeasyStore][0][Auth]') as string
        )?.data?.AuthToken;
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

PrivateApiInstance.interceptors.response.use(
    (response) => {
        if (response.config.method !== 'get') {
            handleSuccess(response.data.message);
        }
        return response;
    },
    (error) => {
        handleErrors(error);
    }
);

export { PublicApiInstance, PrivateApiInstance };

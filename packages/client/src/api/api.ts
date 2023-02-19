import axios from "axios";
import Helper from "../utils/helper";
import {handleErrors, handleSuccess} from "../utils/alertMessage";

const BackendBaseURL =  `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}`;
//
// const HelperClass = new Helper()
// const jwtToken = HelperClass.getJwtToken()



export const PublicApiInstance = axios.create({
    baseURL: BackendBaseURL,

})

PublicApiInstance.interceptors.response.use(
    (response) => {
        if (response.config.method !== 'get') {
            // Display success message for non-GET requests
            handleSuccess(response.data.message);
        }
        return response
    }
    ,
    (error) => {
        handleErrors(error)
    }
)


export const PrivateApiInstance = axios.create({
    baseURL: BackendBaseURL,

})

PrivateApiInstance.interceptors.request.use(
    (config) => {
        let jwtToken = JSON.parse(localStorage.getItem('[EasyPeasyStore][0][Auth]') as string).data.AuthToken
        console.log(jwtToken)
        config.headers.Authorization = `Bearer ${jwtToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }

)

PrivateApiInstance.interceptors.response.use(
    (response) => {
        if (response.config.method !== 'get') {
            // Display success message for non-GET requests
            handleSuccess(response.data.message);
        }
        return response
    },
    (error) => {
        handleErrors(error)
    }
)
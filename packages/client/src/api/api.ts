import axios from "axios";

const BackendBaseURL =  `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}`;

export const PublicApiInstance = axios.create({
    baseURL: BackendBaseURL,
})


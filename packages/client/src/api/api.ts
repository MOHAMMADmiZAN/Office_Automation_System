import axios from "axios";

const BackendBaseURL =  'http://localhost:5000/api/v1';

export const PublicApiInstance = axios.create({
    baseURL: BackendBaseURL,
})

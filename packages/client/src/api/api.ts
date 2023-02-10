import axios from "axios";
import Helper from "../utils/helper";

const BackendBaseURL =  `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}`;

const HelperClass = new Helper()
const jwtToken = HelperClass.getJwtToken()


export const PublicApiInstance = axios.create({
    baseURL: BackendBaseURL,

})
export const PrivateApiInstance = axios.create({
  baseURL: BackendBaseURL,
    headers: {
        Authorization: `Bearer ${jwtToken}`
    }
})


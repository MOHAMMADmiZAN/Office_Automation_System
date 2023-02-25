import {AxiosError} from "axios";
import {toast} from "react-toastify";

interface errorData {
    message: string;
    success: boolean;
}

export const handleErrors = (error: AxiosError) => {
    const {message} = error.response?.data as errorData
    console.log(message)
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        toastId: "error",
    });

}
export const handleSuccess = (message: string) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        toastId: "success",
    });
}





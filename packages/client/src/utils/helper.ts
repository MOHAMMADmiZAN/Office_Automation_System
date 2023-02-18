import { AxiosError } from 'axios';
interface HelperInterface {
    getJwtToken: () => string;
}
interface ErrorResponse {
    message: string;
    name?: string;
    stack?: string;
    code?: string;
    status?: number;
}



class Helper implements HelperInterface {
    getJwtToken(): string {
        if (!localStorage.getItem('[EasyPeasyStore][0][Auth]')) {
            return '';
        }
        return JSON.parse(localStorage.getItem('[EasyPeasyStore][0][Auth]') as string).data.AuthToken;

    }





}

export default Helper;
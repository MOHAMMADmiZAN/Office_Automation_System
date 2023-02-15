interface HelperInterface {
    getJwtToken: () => string;
}

class Helper implements HelperInterface {
    getJwtToken(): string {
        if (!localStorage.getItem('[EasyPeasyStore][0][Auth]')) {
            return '';
        }
        return JSON.parse(localStorage.getItem('[EasyPeasyStore][0][Auth]') as string).data.AuthToken;

    }

    // unix to local time moment js


}

export default Helper;
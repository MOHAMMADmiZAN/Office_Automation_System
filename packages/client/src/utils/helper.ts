interface HelperInterface {
    getJwtToken: () => string;
}

class Helper implements HelperInterface {
    getJwtToken(): string {
        return JSON.parse(localStorage.getItem('[EasyPeasyStore][0][Auth]') as string).data.AuthToken;

    }

}

export default Helper;
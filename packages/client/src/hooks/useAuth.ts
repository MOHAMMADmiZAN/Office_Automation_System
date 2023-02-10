import {State, useStoreState} from "easy-peasy";
import {AuthType} from "../store/models/AuthModel";

const useAuth = () => {
    const {AuthUser, AuthToken} = useStoreState((state: State<AuthType>) => state.Auth)
    return {
        user: AuthUser,
        token: AuthToken
    }
}

export default useAuth
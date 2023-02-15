import {State, useStoreState} from "easy-peasy";
import {AuthType} from "../store/models/AuthModel";

const useAuth = () => {
    const {AuthUser, AuthToken,isAuth} = useStoreState((state: State<AuthType>) => state.Auth)
    return {
        user: AuthUser,
        token: AuthToken,
        isAuth,
        userId: AuthUser._id
    }
}

export default useAuth
import {Actions, State, useStoreActions, useStoreState} from "easy-peasy";
import {AuthType} from "../store/models/AuthModel";

const useAuth = () => {
    const {AuthUser, AuthToken, isAuth} = useStoreState((state: State<AuthType>) => state.Auth)
    const Login = useStoreActions((actions: Actions<AuthType>) => actions.Auth.Login);
    const ChangePassword = useStoreActions((actions: Actions<AuthType>) => actions.Auth.ChangePassword);

    return {
        user: AuthUser,
        token: AuthToken,
        isAuth,
        userId: AuthUser._id,
        Login,
        ChangePassword
    }
}

export default useAuth
import {Action, action, State, Thunk, thunk} from 'easy-peasy';
import {AuthApi} from "../../api/Auth.api";
import {UserApi} from '../../api/User.api';


export interface AuthType {
    Auth: typeof AuthModel
}

export interface loginPayload {
    email: string;
    password: string;
}

export interface ChangePasswordPayload {
    oldPassword: string;
    password: string;
    confirmPassword: string;
}

export interface registerPayload extends User {

}

export interface User {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
    status?: string;
    avatar?: string;


}

export type authResponse = {
    token: string;
    user: User;
}

// gene

type AuthState = State<Auth>;
type AuthAction<T> = Action<Auth, T>
type AuthThunk<T> = Thunk<Auth, T>

export interface Auth {
    isAuth: boolean;
    AuthToken: string;
    AuthUser: User;
    AuthSet: Action<Auth, authResponse>;
    AuthClear: AuthAction<void>;
    Login: AuthThunk<loginPayload>;
    Register: AuthThunk<registerPayload>;
    Logout: AuthThunk<void>;
    ChangePassword: AuthThunk<ChangePasswordPayload>;

}

const AuthUserDefault: User = {
    firstName: " ",
    lastName: " ",
    email: " ",
    password: " ",
    role: " ",
    status: " ",
    avatar: " ",
    _id: " ",
}

const AuthModel: Auth = {
    isAuth: false,
    AuthToken: " ",
    AuthUser: {...AuthUserDefault},
    AuthSet: action((state: AuthState, payload) => {
        state.AuthToken = payload.token;
        state.AuthUser = payload.user;
        state.isAuth = true;


    }),
    AuthClear: action((state: AuthState) => {
        state.AuthToken = " ";
        state.AuthUser = {...AuthUserDefault};
        state.isAuth = false;
    }),
    Login: thunk(async (actions, payload) => {
        const data = await AuthApi.login(payload);
        actions.AuthSet(data)
        return !!data
    }),
    ChangePassword: thunk(async (_actions, payload) => {
        const data = await UserApi.changePassword(payload);
        return data
    }),
    Register: thunk(async (_actions, payload) => {
        console.log(payload)
        const data = await AuthApi.register(payload);
        return !!data
    }),
    Logout: thunk(async (actions, payload) => {
        actions.AuthClear()
    })
}

export default AuthModel
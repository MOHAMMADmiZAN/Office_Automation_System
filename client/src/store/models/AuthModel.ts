import {Action, action, State, Thunk, thunk} from 'easy-peasy';


export  interface AuthType  {
    Auth: typeof AuthModel
}

interface loginPayload {
    email: string;
    password: string;
}
interface registerPayload {
    email: string;
    password: string;
    username: string;
    phone: string;
    confirmPassword?: string;
}
interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
    role: string;
    createdAt: string;
    updatedAt: string;



}

export type authResponse = {
    jwt: string;
    user: User;
}

// gene

type AuthState = State<Auth>;
type AuthAction<T> = Action<Auth, T>
type AuthThunk<T> = Thunk<Auth, T>

export interface Auth {
    isAuth: boolean;
    AuthToken: string;
    AuthUser: {}
    AuthSet: Action<Auth, authResponse>;
    AuthClear: AuthAction<void>;
    Login: AuthThunk<loginPayload>;
    Register: AuthThunk<registerPayload>;
    Logout: AuthThunk<void>;

}


const AuthModel: Auth = {
    isAuth: false,
    AuthToken: " ",
    AuthUser: {},
    AuthSet: action((state: AuthState, payload) => {
        state.AuthToken = payload.jwt;
        state.AuthUser = payload.user;
        state.isAuth = true;


    }),
    AuthClear: action((state: AuthState) => {
        state.AuthToken = " ";
        state.AuthUser = {};
        state.isAuth = false;

    }),
    Login: thunk(async (actions, payload) => {



    }),
    Register: thunk(async (actions, payload) => {


    }),
    Logout: thunk(async (actions, payload) => {
        actions.AuthClear()
    })
}

export default AuthModel
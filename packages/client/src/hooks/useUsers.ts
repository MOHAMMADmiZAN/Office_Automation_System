import {useQuery} from "react-query";
import {UserApi} from "../api/User.api";
import {AuthType, User} from "../store/models/AuthModel";
import {Actions, useStoreActions} from "easy-peasy";
import {useRole} from "./useRole";
import UserInfo, {IUserInfoPayloadWithId} from "../api/UserInfo";


export const useUsers = () => {
    const {data:users, error:usersError, isLoading:usersIsLoading} = useQuery<User[]>('allUsers', UserApi.getAllUsers)
    const Register = useStoreActions((actions: Actions<AuthType>) => actions.Auth.Register);
    const {superAdmin} = useRole()
     let Users = users?.filter(user => user.role !== superAdmin?._id)


    return {
        Users,
        usersError,
        usersIsLoading,
        Register,

    }

}
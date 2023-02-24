import {useMutation, useQuery, useQueryClient} from "react-query";
import {UserApi} from "../api/User.api";
import {AuthType, User} from "../store/models/AuthModel";
import {Actions, useStoreActions} from "easy-peasy";
import {useRole} from "./useRole";

export interface IUpdateUserPayload {
    id: string,
     payload: User
 }

 export interface IUpdateUserAvatarPayload {
    id: string,
        payload: {
        avatar: Blob
        }
 }

export const useUsers = () => {
     const queryClient = useQueryClient();
    const {data:users, error:usersError, isLoading:usersIsLoading} = useQuery<User[]>('allUsers', UserApi.getAllUsers)
    const Register = useStoreActions((actions: Actions<AuthType>) => actions.Auth.Register)
    const {superAdmin} = useRole()
     let Users = users?.filter(user => user.role !== superAdmin?._id)

    const { mutateAsync: updateUser} = useMutation( (data:IUpdateUserPayload)=> UserApi.updateUser(data.id,data.payload),{
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("allUsers");
        }
    })
     const { mutateAsync: updateUserAvatar} = useMutation( (data:IUpdateUserAvatarPayload)=> UserApi.updateUserAvatar(data.id,data.payload.avatar),{
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("allUsers");
        }
     })


    return {
        Users,
        usersError,
        usersIsLoading,
        Register,
        usersWithSuperAdmin : users,
        updateUser,
        updateUserAvatar

    }

}

export default useUsers
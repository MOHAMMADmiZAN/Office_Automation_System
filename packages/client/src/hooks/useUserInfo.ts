import {useMutation, useQuery, useQueryClient} from "react-query";
import UserInfoApi, {IUserInfoPayload, IUserInfoPayloadWithId} from "../api/UserInfo.api";

export interface IUpdateUserInfo {
    id: string;
    payload: IUserInfoPayload
}

export const useUserInfo = () => {
    const queryClient = useQueryClient();
    const {
        data: userBasicInfo,
        error: userBasicInfoError,
        isLoading: userBasicInfoIsLoading
    } = useQuery<IUserInfoPayloadWithId[]>('userBasicInfo', UserInfoApi.getAllUserInfo)
    const {mutateAsync: createUserInfo} = useMutation((data: IUserInfoPayload) => UserInfoApi.createUserInfo(data), {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("userBasicInfo");
            await queryClient.invalidateQueries("allUsers");

        }
    })
    const {mutateAsync: updateUserInfo} = useMutation((data: IUpdateUserInfo) => UserInfoApi.updateUserInfo(data.id, data.payload), {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("userBasicInfo");
            await queryClient.invalidateQueries("allUsers");
        }
    })

    return {
        userBasicInfo,
        userBasicInfoError,
        userBasicInfoIsLoading,
        createUserInfo,
        updateUserInfo
    }

}

export default useUserInfo
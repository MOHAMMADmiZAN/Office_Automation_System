import {useMutation, useQuery, useQueryClient} from "react-query";
import UserInfo, {IUserInfoPayload, IUserInfoPayloadWithId} from "../api/UserInfo";

export interface IUpdateUserInfo {
    id: string;
    payload: IUserInfoPayload
}

export const useUserInfo = () => {
    const queryClient = useQueryClient();
    const {data:userBasicInfo, error:userBasicInfoError, isLoading:userBasicInfoIsLoading} = useQuery<IUserInfoPayloadWithId[]>('userBasicInfo', UserInfo.getAllUserInfo)
    const {mutateAsync: createUserInfo} = useMutation((data: IUserInfoPayload) => UserInfo.createUserInfo(data), {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("userBasicInfo");
            await queryClient.invalidateQueries("allUsers");

        }
    })
    const { mutateAsync: updateUserInfo } = useMutation((data:IUpdateUserInfo ) => UserInfo.updateUserInfo(data.id,data.payload), {
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
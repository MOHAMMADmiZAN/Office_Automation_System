import {useMutation, useQuery, useQueryClient} from "react-query";
import UserInfo, {IUserInfoPayload, IUserInfoPayloadWithId} from "../api/UserInfo";


export const useUserInfo = () => {
    const queryClient = useQueryClient();
    const {data:userBasicInfo, error:userBasicInfoError, isLoading:userBasicInfoIsLoading} = useQuery<IUserInfoPayloadWithId[]>('userBasicInfo', UserInfo.getAllUserInfo)
    const {mutateAsync: createUserInfo} = useMutation((data: IUserInfoPayload) => UserInfo.createUserInfo(data), {
        onSuccess: async (data) => {
            console.log(data)
            await queryClient.invalidateQueries("userBasicInfo");

        }
    })

    return {
        userBasicInfo,
        userBasicInfoError,
        userBasicInfoIsLoading,
        createUserInfo
    }

}
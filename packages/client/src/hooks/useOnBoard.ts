import {useMutation, useQuery, useQueryClient} from "react-query";
import {IUserOnBoardWithId, UserOnBoardApi} from "../api/UserOnBoard";

export interface IUpdateOnBoard {
    id: string;
    payload: IUserOnBoardWithId

}


export const useOnBoard = () => {
    const queryClient = useQueryClient();

    const {data: OnBoardData} = useQuery('onboard', UserOnBoardApi.userOnBoardList);

    const {mutateAsync: createOnBoard} = useMutation(UserOnBoardApi.userOnBoardCreate, {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("onboard");

        }
    })
    const {mutateAsync: updateOnBoard} = useMutation((data: IUpdateOnBoard) => UserOnBoardApi.userOnBoardUpdate(data.payload, data.id), {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("onboard");
        }
    })


    return {
        OnBoardData,
        createOnBoard,
        updateOnBoard
    }


}
export default useOnBoard
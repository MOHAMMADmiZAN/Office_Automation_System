import {useMutation, useQuery, useQueryClient} from "react-query";
import {UserOnBoardApi} from "../api/UserOnBoard";


export const useOnBoard = () => {
     const queryClient = useQueryClient();

    const { data: OnBoardData } = useQuery('onboard', UserOnBoardApi.userOnBoardList);

      const {mutateAsync: createOnBoard} = useMutation(UserOnBoardApi.userOnBoardCreate,{
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("onboard");

        }
      })


    return {
        OnBoardData,
        createOnBoard,
    }


}
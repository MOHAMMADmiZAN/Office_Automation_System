import {useMutation, useQuery, useQueryClient} from "react-query";
import {IUserDocument, UserDocumentApi} from "../api/UserDocument";


export const useDocument = ()=>{

    const queryClient = useQueryClient();

    const {data:userAllDocument} = useQuery('document',UserDocumentApi.userDocumentList)

     const {mutateAsync:createDocument} = useMutation((payload: IUserDocument)=>UserDocumentApi.userDocumentCreate(payload),{
            onSuccess: async (data) => {
                await queryClient.invalidateQueries("document");
                console.log(data)

            }
     })


 return {
        userAllDocument,
        createDocument
 }






 }
 export default useDocument
import {useUsers} from "./useUsers";
import {useRole} from "./useRole";
import {useUserInfo} from "./useUserInfo";
import {useOnBoard} from "./useOnBoard";
import {useDocument} from "./useDocument";

const useUser = (id: string) => {

    const {Users} = useUsers()
    const user = Users?.find((u) => u._id === id)
    const {Roles} = useRole()
    const userRole = Roles?.find((role) => role._id === user?.role)
    const {userBasicInfo} = useUserInfo()
    const userInfo = userBasicInfo?.find((info) => info.user === user?._id)
    const {OnBoardData} = useOnBoard()
    const onBoard = OnBoardData?.find((onBoard) => onBoard.user === user?._id)
    const {userAllDocument} = useDocument()
    const userDocument = userAllDocument?.filter((doc) => doc.user === user?._id)

    return {
        user,
        userRole,
        userInfo,
        onBoard,
        userDocument
    }

}
export default useUser
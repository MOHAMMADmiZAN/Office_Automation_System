import {useMutation, useQuery, useQueryClient} from "react-query";
import LeaveApi, {ILeavePayload} from "../api/Leave.api";


const useLeave = () => {
    const queryClient = useQueryClient()
    const {
        data: leaves,
        error: leavesError,
        isLoading: leavesIsLoading
    } = useQuery<ILeavePayload[]>('allLeaves', LeaveApi.leaveList)
    const {mutateAsync: sendLeaveRequest} = useMutation((data: ILeavePayload) => LeaveApi.leaveCreate(data), {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("allLeaves");
        }
    })
    const {mutateAsync: deleteLeave} = useMutation((id: string) => LeaveApi.leaveDelete(id), {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("allLeaves");
        }
    })
    const {mutateAsync: updateLeave} = useMutation((data: { id: string, payload: ILeavePayload }) => LeaveApi.leaveUpdate(data.payload, data.id), {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("allLeaves");
        }
    })

    return {
        leaves,
        leavesError,
        leavesIsLoading,
        sendLeaveRequest,
        deleteLeave,
        updateLeave
    }

}

export default useLeave
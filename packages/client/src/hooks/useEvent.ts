import {useMutation, useQuery, useQueryClient} from "react-query";
import {EventApi, IChangeInvitedEventStatus, IEventPayload, IEventPayloadWithId} from "../api/Event.api";

interface changeInviteStatusMutatePayload {
    eventId: string,
    data: IChangeInvitedEventStatus


}
export const useEvent = (singleEventId?:string)=>{
    const queryClient = useQueryClient();

    const {data:Events, error:eventsError, isLoading:eventsIsLoading} = useQuery<IEventPayloadWithId[]>('allEvents', EventApi.eventList)
    const { mutate: eventDelete } = useMutation((id: string) => EventApi.eventDelete(id), {
        onSuccess: async () => {
            await queryClient.invalidateQueries("allEvents");

        },
    });
    const { mutate: changeInviteStatusMutate } = useMutation((payload:changeInviteStatusMutatePayload)=>EventApi.changeInviteStatus(payload.eventId,payload.data),{
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("allEvents");
            console.log(data)
        }
    })
    const {mutateAsync: editEvent} = useMutation((data: IEventPayload) => EventApi.eventUpdate(data,singleEventId as string), {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("allEvents");

        }
    })
    const {mutate: createEvent} = useMutation(EventApi.eventCreate,{
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("allEvents");

        }
    })



    return {
        Events,
        eventsError,
        eventsIsLoading,
        eventDelete,
        changeInviteStatusMutate,
        editEvent,
        createEvent
    }

}



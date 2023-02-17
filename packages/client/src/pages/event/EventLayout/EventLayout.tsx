import React, {memo} from 'react';
import {EventApi, IChangeInvitedEventStatus, IEventPayloadWithId} from "../../../api/Event.api";
import {User} from "../../../store/models/AuthModel";
import {useMutation, useQuery, useQueryClient} from "react-query";
import DataTable, {DataTableData} from "../../../components/organisms/DataTable/DataTable";
import moment from "moment/moment";
import {Box, Typography} from "@mui/material";
import CustomModal from "../../../components/organisms/CustomModal/CustomModal";
import {Delete, Edit, InsertInvitation} from "@mui/icons-material";
import Btn from "../../../components/molecules/Form/Btn";
import EditEventModal from '../EditEventModal/EditEventModal';
import InviteUsersModal, {inviteUser} from "../InviteUsersModal/InviteUsersModal";
import {UserApi} from "../../../api/User.api";
import useAuth from "../../../hooks/useAuth";

export interface EVENT_LAYOUT_PROPS {
    label: string;
    isBodyRowFuncDate?: (item: Date) => boolean;
    isBodyRowFunc?: (item: IEventPayloadWithId) => boolean;

}
const dataTableData: DataTableData = {
    label: "Event List",
    headerRow: {
        tableCell: [
            {
                align: "center",
                value: "Event Title",
            },
            {
                align: "center",
                value: "Event Description",
            },
            {
                align: "center",
                value: "Event Start Time",
            },
            {
                align: "center",
                value: "Event End Time",
            },
            {
                align: "center",
                value: "Event Type",

            },
            {
                align: "center",
                value: "Event Status",
            },
            {
                align: "center",
                value: "Event Created By",
            },
            {
                align: "center",
                value: "Actions",
            },
        ],
    },
    bodyRow: [],
    DataTablePagination: {
        rowsPerPage: [5, 10, 15],
    },
}
  interface changeInviteStatusMutatePayload {
        eventId: string,
       data: IChangeInvitedEventStatus


  }
const EventLayout: React.FC<EVENT_LAYOUT_PROPS> = ({ isBodyRowFuncDate, label, isBodyRowFunc }): JSX.Element => {
    const queryClient = useQueryClient();
    const { userId } = useAuth();

    const { data: events } = useQuery<IEventPayloadWithId[]>(
        "allEvents",
        () => EventApi.eventList(),
        {
            onSuccess: async (data) => {
                console.log(data);
            },
        }
    );

    const { data: authors } = useQuery<User[]>("allUser", () => UserApi.getAllUsers(), {
        onSuccess: async (data) => {
            console.log(`all user`, data)
        },
    });

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

    const handleEventDelete = (id: string) => {
        eventDelete(id);
    };

    const changeInviteStatus = (id: string, status: string) => {
        if (!userId) return;
        const payload = {
            eventId: id,
            data:{
                userId,
                status
            }
        }

        changeInviteStatusMutate(payload);
    };
    
    
    const bodyRow: DataTableData["bodyRow"] = [];
    if (events) {
        events.map((item) => {
            const author = authors?.find((author) => author._id === item.author);
            let isTrue
            if (isBodyRowFuncDate) {
                isTrue = isBodyRowFuncDate(item.startTime);
            } else if (isBodyRowFunc) {
                isTrue = isBodyRowFunc(item);

            }
            const tableCell = [
                {
                    align: "center",
                    value: item.title,
                },
                {
                    align: "center",
                    value: item.description,
                },
                {
                    align: "center",
                    value: moment(item.startTime).calendar(),
                },
                {
                    align: "center",
                    value: moment(item.endTime).calendar(),
                },
                {
                    align: "center",
                    value: item.type,
                },
                {
                    align: "center",
                    value: item.status,
                },
                {
                    align: "center",
                    value: author?.firstName + " " + author?.lastName,
                },
                {
                    align: "center",
                    value: (

                        <Box display={`flex`}>
                            {(author?._id === userId) &&
                                <>
                                    <CustomModal modalId={'edit-event'}
                                        modalContent={<EditEventModal eventData={item} />}
                                        ModalBtnIcon={<Edit />} />
                                    <Btn BtnStartIcon={<Delete color={`error`} />}
                                        onClick={() => handleEventDelete(item._id)} />
                                    <CustomModal modalId={`invite-event`}
                                        modalContent={<InviteUsersModal authors={authors as User[]}
                                            eventData={item} />}
                                        modalBtnText={`invite`} ModalBtnIcon={<InsertInvitation />} />
                                </>
                            }
                            {
                                item.invitation.find((item: inviteUser) => item.userId === userId && item.status === 'PENDING') && (
                                    <>
                                        <Btn BtnText={`Accept`} variant={`contained`} onClick={() => changeInviteStatus(item._id, 'YES')} />
                                        <Btn BtnText={`Maybe`} variant={`contained`} color={`info`} onClick={() => changeInviteStatus(item._id, 'MAYBE')} />
                                        <Btn BtnText={`reject`} variant={`contained`} color={`error`} onClick={() => changeInviteStatus(item._id, 'NO')} />
                                    </>
                                )
                            }

                        </Box>

                    ),
                },
            ];

            if (isTrue) {

                bodyRow.push({ tableCell });
            }
        });
    }


    return (
        <>
            {bodyRow.length > 0 ? <DataTable DataTableData={{ ...dataTableData, bodyRow, label }} /> :
                <Typography variant={`h1`} component={`h1`} sx={{ textAlign: 'center' }}>No Event here </Typography>}
        </>
    );
};

export default memo(EventLayout);
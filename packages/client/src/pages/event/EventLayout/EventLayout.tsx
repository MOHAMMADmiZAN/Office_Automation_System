import React, { memo } from 'react';
import { IEventPayloadWithId } from "../../../api/Event.api";
import { User } from "../../../store/models/AuthModel";
import DataTable, { DataTableData } from "../../../components/organisms/DataTable/DataTable";
import moment from "moment/moment";
import { Box, IconButton, Tooltip, Typography, Skeleton } from "@mui/material";
import CustomModal from "../../../components/organisms/CustomModal/CustomModal";
import { Delete, Edit, InsertInvitation, ViewAgendaOutlined } from "@mui/icons-material";
import Btn from "../../../components/molecules/Form/Btn";
import EditEventModal from '../EditEventModal/EditEventModal';
import InviteUsersModal, { inviteUser } from "../InviteUsersModal/InviteUsersModal";
import useAuth from "../../../hooks/useAuth";
import { useUsers } from "../../../hooks/useUsers";
import { useEvent } from "../../../hooks/useEvent";
import { useRole } from '../../../hooks/useRole';
import CustomSkeleton from '../../../components/atoms/CustomSkeleton/CustomSkeleton';

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

const EventLayout: React.FC<EVENT_LAYOUT_PROPS> = ({ isBodyRowFuncDate, label, isBodyRowFunc }): JSX.Element => {
    const { userId } = useAuth();
    const { checkUserPermission } = useRole()

    const { Events: events, eventDelete, changeInviteStatusMutate, eventsIsLoading } = useEvent()

    const { usersWithSuperAdmin: authors } = useUsers()



    const handleEventDelete = (id: string) => {
        eventDelete(id);
    };

    const changeInviteStatus = (id: string, status: string) => {
        if (!userId) return;
        const payload = {
            eventId: id,
            data: {
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

                        <Box display={`flex`} justifyContent={`center`}>
                            <Tooltip title="View Full Event Details">
                                <IconButton>
                                    <ViewAgendaOutlined />
                                </IconButton>
                            </Tooltip>
                            {/* {(author?._id === userId) && */}
                            {checkUserPermission('manageEvent') &&
                                <>
                                    <CustomModal modalId={'edit-event'} modalContent={<EditEventModal eventData={item} />} ModalBtnIcon={<Edit />} />
                                    <IconButton onClick={() => handleEventDelete(item._id)} ><Delete sx={{ color: 'error.main' }} /></IconButton>
                                    <CustomModal modalId={`invite-event`} modalTitle={`invite in event`} modalContent={<InviteUsersModal authors={authors as User[]} eventData={item} />} ModalBtnIcon={<InsertInvitation />} />
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
            {eventsIsLoading ?
                <CustomSkeleton /> : bodyRow.length > 0 ? <DataTable DataTableData={{ ...dataTableData, bodyRow, label }} /> :
                    <Typography variant={`h1`} component={`h1`} sx={{ textAlign: 'center' }}>No Event here </Typography>}
        </>
    );
};

export default memo(EventLayout);
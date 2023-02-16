import React from 'react';
import {useMutation, useQuery, useQueryClient} from "react-query";
import {EventApi, IEventPayload, IEventPayloadWithId} from "../../../api/Event.api";
import DataTable from "../../../components/organisms/DataTable";
import {DataTableData} from "../../../components/organisms/DataTable/DataTable";
import moment from "moment";
import {Delete, Edit, InsertInvitation} from "@mui/icons-material";
import Btn from "../../../components/molecules/Form/Btn";
import {Box, Typography} from "@mui/material";
import {UserApi} from "../../../api/User.api";
import {User} from "../../../store/models/AuthModel";
import CustomModal from "../../../components/organisms/CustomModal/CustomModal";
import FormLayOut from "../../../components/organisms/Form/FormLayOut/FormLayOut";
import {eventFormFields} from "../index";
import {FORM_INPUT_PROPS, selectOption} from "../../../components/molecules/Form/FormInput/Form_Input";
import {eventValidation} from "../../../utils/Validation";
import {SubmitHandler} from 'react-hook-form';
import useAuth from "../../../hooks/useAuth";

interface ALL_EVENT_PROPS {

}

interface editEventModalProps {
    eventData: IEventPayloadWithId;
}

interface inviteUserModalProps extends editEventModalProps {
    authors: User[];


}


export const EditEventModal: React.FC<editEventModalProps> = ({eventData}) => {


    const {mutateAsync: editEvent} = useMutation((data: IEventPayload) => EventApi.eventUpdate(data, eventData._id), {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("todayEvent");

        }
    })
    const queryClient = useQueryClient();


    const onSubmit: SubmitHandler<IEventPayload> = async (data) => {
        await editEvent(data);


    }

    return (
        <>
            <FormLayOut
                defaultValues={eventData}
                FormInputFields={[...eventFormFields] as FORM_INPUT_PROPS[]}
                validationRules={eventValidation}
                onSubmit={onSubmit} btnText={'Edit Event Details'}/>
        </>
    )


}

export const InviteUsersModal: React.FC<inviteUserModalProps> = ({eventData, authors}) => {
    const {mutateAsync: inviteUser} = useMutation((data: IEventPayload) => EventApi.eventUpdate(data, eventData._id), {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("todayEvent");
            console.log(`data`, data)

        }
    })
    const queryClient = useQueryClient();
    const inviteUserFormFields = [
        {
            name: "invitation",
            type: "autocomplete",
            placeholder: "Invite Users",
            smallField: false,
            label: "Invite Users",
            id: "invitation",
            selectOptions: authors.map((author) => {
                return {
                    value: author._id,
                    label: author.firstName + " " + author.lastName
                }
            })
        }
    ]

    interface inviteUser {
        userId: string;
        status: string;
    }

    // defaultValuForInvitation is an array of selectOption
    const defaultValueForInvitation: selectOption[] = eventData.invitation.map((item: inviteUser) => {
        return {
            value: item.userId,
            label: authors.find((author) => author._id === item.userId)?.firstName + " " + authors.find((author) => author._id === item.userId)?.lastName
        }
    })


    const onSubmit: SubmitHandler<IEventPayload> = async (data) => {
        data.invitation = data.invitation.map((item: selectOption) => {
            return {
                userId: item.value,
            }

        });
        await inviteUser(data);
    }
    return (
        <>
            <FormLayOut defaultValues={{...eventData, invitation: defaultValueForInvitation || []}}
                        FormInputFields={inviteUserFormFields as FORM_INPUT_PROPS[]}
                        validationRules={eventValidation} onSubmit={onSubmit} btnText={`Invite Users`}/>

        </>
    )


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

const TodayEvent: React.FC<ALL_EVENT_PROPS> = (props): JSX.Element => {
    const queryClient = useQueryClient();
    const {userId} = useAuth();
    const {data: events, isLoading, error} = useQuery<IEventPayloadWithId[]>(
        "todayEvent",
        () => EventApi.eventList(),
        {
            onSuccess: async (data) => {
                console.log(data);
            },
        }
    );

    const {data: authors} = useQuery<User[]>("allUser", () => UserApi.getAllUsers(), {
        onSuccess: async (data) => {
            console.log(`all user`, data)
        },
    });

    const {mutate} = useMutation((id: string) => EventApi.eventDelete(id), {
        onSuccess: async () => {
            await queryClient.invalidateQueries("todayEvent");
        },
    });

    const handleEventDelete = (id: string) => {
        mutate(id);
    };


    const bodyRow: DataTableData["bodyRow"] = [];
    if (events) {
        events.map((item) => {
            const author = authors?.find((author) => author._id === item.author);
            const isToday = moment(item.startTime).isSame(moment(), "day");
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
                            {(author?._id === userId) ?
                                <>
                                    <CustomModal modalId={'edit-event'}
                                                 modalContent={<EditEventModal eventData={item}/>}
                                                 ModalBtnIcon={<Edit/>}/>
                                    <Btn BtnStartIcon={<Delete color={`error`}/>}
                                         onClick={() => handleEventDelete(item._id)}/>
                                    <CustomModal modalId={`invite-event`}
                                                 modalContent={<InviteUsersModal authors={authors as User[]}
                                                                                 eventData={item}/>}
                                                 modalBtnText={`invite`} ModalBtnIcon={<InsertInvitation/>}/>
                                </> :
                                <Typography variant={`h6`} component={`h6`}> you are not Authorize</Typography>
                            }
                        </Box>

                    ),
                },
            ];

            if (isToday) {
                bodyRow.push({tableCell});
            }
        });
    }


    return (
        <>
            {bodyRow.length > 0 ? <DataTable DataTableData={{...dataTableData, bodyRow}}/> :
                <Typography variant={`h1`} component={`h1`} sx={{textAlign: 'center'}}>There is no event
                    today</Typography>}
        </>


    );

};

export default TodayEvent;
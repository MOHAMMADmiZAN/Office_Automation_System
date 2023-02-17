import React from 'react';
import {User} from "../../../store/models/AuthModel";
import {EDIT_EVENT_MODAL_PROPS} from "../EditEventModal/EditEventModal";
import {useMutation, useQueryClient} from "react-query";
import {EventApi, IEventPayload} from "../../../api/Event.api";
import {FORM_INPUT_PROPS, selectOption} from "../../../components/molecules/Form/FormInput/Form_Input";
import {SubmitHandler} from "react-hook-form";
import FormLayOut from "../../../components/organisms/Form/FormLayOut/FormLayOut";
import {eventValidation} from "../../../utils/Validation";
import useAuth from "../../../hooks/useAuth";

interface INVITE_USERS_MODAL_PROPS  extends EDIT_EVENT_MODAL_PROPS{
    authors: User[];
}

export interface inviteUser {
    userId: string;
    status: string;
}

const InviteUsersModal: React.FC<INVITE_USERS_MODAL_PROPS> = ({eventData,authors}): JSX.Element => {
    const {userId} = useAuth();
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
            selectOptions: authors.filter((author)=> author._id!==userId).map((author) => {
                return {
                    value: author._id,
                    label: author.firstName + " " + author.lastName
                }
            })
        }
    ]



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

};

export default InviteUsersModal;
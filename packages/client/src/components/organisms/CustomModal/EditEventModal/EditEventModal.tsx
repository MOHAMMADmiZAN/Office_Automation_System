import React from 'react';
import {EventApi, IEventPayload, IEventPayloadWithId} from "../../../../api/Event.api";
import {useMutation, useQueryClient} from "react-query";
import {SubmitHandler} from "react-hook-form";
import FormLayOut from "../../Form/FormLayOut/FormLayOut";
import {eventFormFields} from "../../../../pages/event";
import {FORM_INPUT_PROPS} from "../../../molecules/Form/FormInput/Form_Input";
import {eventValidation} from "../../../../utils/Validation";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 export interface EDIT_EVENT_MODAL_PROPS {
    eventData: IEventPayloadWithId;

}

const EditEventModal: React.FC<EDIT_EVENT_MODAL_PROPS> = ({eventData}): JSX.Element => {
    const {mutateAsync: editEvent} = useMutation((data: IEventPayload) => EventApi.eventUpdate(data, eventData._id), {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("todayEvent");

        }
    })
    const queryClient = useQueryClient();


    const onSubmit: SubmitHandler<IEventPayload> = async (data) => {
        toast("Event Updated Successfully.", {
            position: "bottom-right",
            autoClose: 2000,
        });
        await editEvent(data);


    }

    return (
        <>
            <FormLayOut
                defaultValues={eventData}
                FormInputFields={[...eventFormFields] as FORM_INPUT_PROPS[]}
                validationRules={eventValidation}
                onSubmit={onSubmit} btnText={'Edit Event Details'}/>
            <ToastContainer />
        </>
    )

};

export default EditEventModal;
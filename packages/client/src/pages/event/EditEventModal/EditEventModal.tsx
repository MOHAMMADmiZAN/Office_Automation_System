import React from 'react';
import {EventApi, IEventPayload, IEventPayloadWithId} from "../../../api/Event.api";
import {useMutation, useQueryClient} from "react-query";
import {SubmitHandler} from "react-hook-form";
import FormLayOut from "../../../components/organisms/Form/FormLayOut/FormLayOut";
import {eventFormFields} from "../AddEventModal/AddEventModal";
import {FORM_INPUT_PROPS} from "../../../components/molecules/Form/FormInput/Form_Input";
import {eventValidation} from "../../../utils/Validation";
import {useEvent} from "../../../hooks/useEvent";

export interface EDIT_EVENT_MODAL_PROPS {
    eventData: IEventPayloadWithId;

}

const EditEventModal: React.FC<EDIT_EVENT_MODAL_PROPS> = ({eventData}): JSX.Element => {
    const {editEvent} = useEvent(eventData._id)


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

};

export default EditEventModal;
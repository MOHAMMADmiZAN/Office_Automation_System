import React from 'react';
import FormLayOut from "../../../components/organisms/Form/FormLayOut/FormLayOut";
import {FORM_INPUT_PROPS, FormInputType, selectOption} from "../../../components/molecules/Form/FormInput/Form_Input";
import {eventValidation} from "../../../utils/Validation";
import {Add} from "@mui/icons-material";
import CustomModal from "../../../components/organisms/CustomModal/CustomModal";
import useAuth from "../../../hooks/useAuth";
import {useMutation, useQueryClient} from "react-query";
import {EventApi, IEventPayload} from "../../../api/Event.api";
import {SubmitHandler} from "react-hook-form";
import {useEvent} from "../../../hooks/useEvent";

interface ADD_EVENT_MODAL_PROPS {


}
const defaultValues = {
    author: '',
    title: '',
    description: '',
    startTime: new Date(),
    endTime: new Date(),
    status: '',
    type: '',


}

export interface eventFormInputField {
    name: string;
    type: FormInputType;
    placeholder: string;
    smallField: boolean;
    label: string;
    id?: string;
    selectOptions?: selectOption[];

}

export const eventFormFields: eventFormInputField[] = [
    {
        name: `title`,
        type: `text`,
        placeholder: `Type Your Event Title`,
        smallField: false,
        label: `Event Title`,
    },
    {
        name: `description`,
        type: `textarea`,
        placeholder: `Type Your Event Description`,
        smallField: false,
        label: `Event Description`,
    },
    {
        name: `startTime`,
        type: `datetime-local`,
        placeholder: `Type Your Event Start Time`,
        smallField: true,
        label: `Event Start Time`,
        id: `startTime`

    }, {
        name: `endTime`,
        type: `datetime-local`,
        placeholder: `Type Your Event End Time`,
        smallField: true,
        label: `Event End Time`,
        id: `endTime`

    },
    {
        name: `type`,
        type: `select`,
        placeholder: `Select Event Type`,
        smallField: true,
        label: `Event Type`,
        selectOptions: [{
            value: `MEETING`,
            label: `MEETING`
        }, {
            value: `BIRTHDAY`,
            label: `BIRTHDAY`
        },
            {
                value: `FAREWELL`,
                label: `FAREWELL`
            },
            {
                value: `OTHER`,
                label: `OTHER`
            }


        ]
    }

]

const AddEventModal: React.FC<ADD_EVENT_MODAL_PROPS> = (props): JSX.Element => {

    const {userId} = useAuth();
    const {createEvent}= useEvent()


    const onSubmit: SubmitHandler<IEventPayload> = async (data) => {await createEvent(data);}
    return (
        <>
            <CustomModal modalId={`add-event`} modalContent={
                <FormLayOut FormInputFields={eventFormFields as FORM_INPUT_PROPS[]}
                            defaultValues={{...defaultValues, author: userId}}
                            btnText={`Add Event`}
                            onSubmit={onSubmit} validationRules={eventValidation}/>
            }
                         ModalBtnIcon={<Add/>}
                         modalTitle={`Add Event`}
                         modalBtnText={`Add Event`}
                         modalBtnVariant={`outlined`}
            />

        </>
    );
};

export default AddEventModal;
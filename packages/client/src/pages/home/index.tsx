import React, {useLayoutEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import BaseLayout from "../../layouts/Base.Layout";
import FormLayOut from "../../components/organisms/Form/FormLayOut/FormLayOut";
import {InviteUsersModal} from "../event/UpcomingEvent/TodayEvent";
import {User} from "../../store/models/AuthModel";
import {Form_TextInput} from "../../components/molecules/Form/FormInput/styles/FormInput.style";
import {Autocomplete, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {FORM_INPUT_PROPS, FormInputType, selectOption} from "../../components/molecules/Form/FormInput/Form_Input";
import {eventValidation} from "../../utils/Validation";




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




const Index: React.FC = (): JSX.Element => {





    const { control, handleSubmit } = useForm();

    const onSubmit = (data:any) => {
        console.log(data);
    };

    return (

        <FormLayOut FormInputFields={eventFormFields as FORM_INPUT_PROPS[]}
                    defaultValues={{...defaultValues, author: '1'}}
                    btnText={`Add Event`}
                    onSubmit={onSubmit} validationRules={eventValidation}/>
    )
            


};

export default Index;
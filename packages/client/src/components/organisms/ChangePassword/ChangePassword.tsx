import React from 'react';
import FormLayOut from "../Form/FormLayOut/FormLayOut";
import { FORM_INPUT_PROPS, FormInputType, selectOption } from "../../molecules/Form/FormInput/Form_Input";
import { changePasswordValidation, eventValidation } from "../../../utils/Validation";
import useAuth from "../../../hooks/useAuth";
import { IEventPayload } from "../../../api/Event.api";
import { SubmitHandler } from "react-hook-form";
import { useEvent } from "../../../hooks/useEvent";
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';
import { ChangePasswordPayload } from '../../../store/models/AuthModel'


interface CHANGE_PASSWORD_PROPS {
    handleClose: Function,
    open: boolean
}


const defaultValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
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
        name: `oldPassword`,
        type: `password`,
        placeholder: `Enter your current password`,
        smallField: false,
        label: `Current Password`,
    },
    {
        name: `password`,
        type: `password`,
        placeholder: `Enter your password`,
        smallField: false,
        label: `Password`,
    },
    {
        name: `confirmPassword`,
        type: `password`,
        placeholder: `Enter your confirm password`,
        smallField: false,
        label: `Confirm Password`,
    },
]

const ChangePassword: React.FC<CHANGE_PASSWORD_PROPS> = ({ open, handleClose }): JSX.Element => {

    const { ChangePassword } = useAuth();


    const onSubmit: SubmitHandler<ChangePasswordPayload> = async (data) => {
        const result = await ChangePassword(data);
        result && handleClose()
    }
    return (
        <>
            <ChangePasswordModal modalId={`change-password`} modalContent={
                <FormLayOut FormInputFields={eventFormFields as FORM_INPUT_PROPS[]}
                    defaultValues={{ ...defaultValues }}
                    btnText={`Change Password`}
                    onSubmit={onSubmit} validationRules={changePasswordValidation} />
            }
                modalTitle={`Change Password`}
                open={open}
                handleClose={handleClose}
            />

        </>
    );
};

export default ChangePassword;
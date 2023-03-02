import React from 'react';
import {ILeavePayload} from "../../../api/Leave.api";
import FormLayOut from "../../../components/organisms/Form/FormLayOut/FormLayOut";
import {FORM_INPUT_PROPS, FormInputType, selectOption} from "../../../components/molecules/Form/FormInput/Form_Input";
import {leaveRequestResponseValidation} from "../../../utils/Validation";
import {SubmitHandler} from "react-hook-form";
import useLeave from "../../../hooks/useLeave";

interface LEAVE_REQUEST_RESPONSE_PROPS {
    data: ILeavePayload

}

interface leaveRequestResponseField {
    label: string;
    name: string;
    type: FormInputType;
    placeholder: string;
    selectOptions?: selectOption[];
    smallField?: boolean;

}

const leaveStatus = [
    {value: 'Pending', label: 'Pending'},
    {value: 'Approved', label: 'Approved'},
    {value: 'Rejected', label: 'Rejected'},
];
const leaveRequestResponseFields: leaveRequestResponseField[] = [
    {
        label: 'Response',
        name: 'leaveStatus',
        type: 'select',
        placeholder: 'Select Response',
        selectOptions: leaveStatus,
        smallField: false,


    },
    {
        label: 'Comment',
        name: 'requestToResponseComment',
        type: 'textarea',
        placeholder: 'Enter Comment',
        smallField: false,

    }
]


const LeaveRequestResponse: React.FC<LEAVE_REQUEST_RESPONSE_PROPS> = ({data}): JSX.Element => {

    const {updateLeave} = useLeave()

    const onSubmit: SubmitHandler<ILeavePayload> = async (data) => {
        await updateLeave({id: data._id as string, payload: data})
    }


    return (
        <>
            <FormLayOut defaultValues={{...data}} FormInputFields={leaveRequestResponseFields as FORM_INPUT_PROPS[]}
                        validationRules={leaveRequestResponseValidation} onSubmit={onSubmit} btnText={'Submit'}/>

        </>
    );
};

export default LeaveRequestResponse;
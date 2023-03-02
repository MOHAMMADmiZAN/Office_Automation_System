import React, {useMemo} from 'react';
import FormLayOut from "../../../components/organisms/Form/FormLayOut/FormLayOut";
import {LeaveValidation} from "../../../utils/Validation";
import {FORM_INPUT_PROPS, FormInputType, selectOption} from "../../../components/molecules/Form/FormInput/Form_Input";
import useUsers from "../../../hooks/useUsers";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import {User} from "../../../store/models/AuthModel";
import {SubmitHandler} from "react-hook-form";
import useLeave from "../../../hooks/useLeave";
import {ILeavePayload} from "../../../api/Leave.api";

interface ADD_LEAVE_PROPS {
}

interface LeaveAddFormDataType {
    leaveType: string;
    leaveReason: string;
    leaveStartDate: string;
    leaveEndDate: string;
    leaveStatus: string;
    leaveComment: string;
    leaveAttachment?: Blob | string;
    requestToResponse: string;
}


const leaveTypes = [
    {value: 'Sick Leave', label: 'Sick Leave'},
    {value: 'Annual Leave', label: 'Annual Leave'},
    {value: 'Maternity Leave', label: 'Maternity Leave'},
    {value: 'Paternity Leave', label: 'Paternity Leave'},
    {value: 'Compassionate Leave', label: 'Compassionate Leave'},
    {value: 'Study Leave', label: 'Study Leave'},
    {value: 'Unpaid Leave', label: 'Unpaid Leave'},
];

const leaveReasons = [
    {value: 'Personal', label: 'Personal'},
    {value: 'Family', label: 'Family'},
    {value: 'Medical', label: 'Medical'},
    {value: 'Study', label: 'Study'},
    {value: 'Other', label: 'Other'},
];

const leaveStatus = [
    {value: 'Pending', label: 'Pending'},
    {value: 'Approved', label: 'Approved'},
    {value: 'Rejected', label: 'Rejected'},
];


const defaultValues = {
    leaveType: '', // 1 = sick leave, 2 = annual leave, 3 = maternity leave, 4 = paternity leave, 5 = compassionate leave, 6 = study leave, 7 = unpaid leave
    leaveReason: '', // 1 = personal, 2 = family, 3 = medical, 4 = study, 5 = other
    leaveStartDate: '',
    leaveEndDate: '',
    leaveStatus: 'Pending', // 1 = pending, 2 = approved, 3 = rejected
    leaveComment: '',
    leaveAttachment: '',
    requestToResponse: '',


}

interface LeaveFormInputField {
    name: string;
    label: string;
    type: FormInputType;
    placeholder: string;
    isRequired?: boolean;
    smallField: boolean;
    selectOptions?: selectOption[];

}

const leaveFormInputFields: LeaveFormInputField[] = [
    {
        name: 'leaveType',
        label: 'Leave Type',
        type: 'select',
        placeholder: 'Select Leave Type',

        smallField: true,
        selectOptions: leaveTypes


    },
    {
        name: 'leaveReason',
        label: 'Leave Reason',
        type: 'select',
        placeholder: 'Select Leave Reason',

        smallField: true,
        selectOptions: leaveReasons
    },
    {
        name: 'leaveStartDate',
        label: 'Leave Start Date',
        type: 'date',
        placeholder: 'Select Leave Start Date',

        smallField: true,
    },
    {
        name: 'leaveEndDate',
        label: 'Leave End Date',
        type: 'date',
        placeholder: 'Select Leave End Date',

        smallField: true,
    },
    {
        name: 'leaveComment',
        label: 'Leave Comment',
        type: 'textarea',
        placeholder: 'Enter Leave Comment',

        smallField: false,
    },
    {
        name: 'leaveAttachment',
        label: 'Leave Attachment',
        type: 'file',
        placeholder: 'Select Leave Attachment',

        smallField: true,
    },

]


const AddLeave: React.FC<ADD_LEAVE_PROPS> = (props): JSX.Element => {

    const {usersWithSuperAdmin} = useUsers();
    const {roles} = useRole();
    const {userId} = useAuth();
    const {sendLeaveRequest} = useLeave();

    const leaveFormInputFieldsWithRequestToResponse = useMemo(() => {
        if (!usersWithSuperAdmin || !roles) return leaveFormInputFields;

        const adminUsers = usersWithSuperAdmin.reduce((acc: User[], user: User) => {
            const role = roles?.find((r) => r._id === user.role);
            if (role && (role.name === "admin" || role.name === "super_admin") && user._id !== userId) {
                acc.push(user);
            }
            return acc;
        }, []);

        const requestToResponseUser = adminUsers.map((user: User) => ({
            value: user._id,
            label: user.firstName + " " + user.lastName,
        }));

        const requestToResponse: LeaveFormInputField = {
            name: "requestToResponse",
            label: "Request To Response",
            type: "select",
            placeholder: "Select Request To Response",
            smallField: true,
            selectOptions: requestToResponseUser as selectOption[],
        };

        return [...leaveFormInputFields, requestToResponse];
    }, [usersWithSuperAdmin, roles, userId, leaveFormInputFields]);


    const onSubmit: SubmitHandler<LeaveAddFormDataType> = async (data) => {
        await sendLeaveRequest(data as ILeavePayload);
    }


    return (
        <>
            <FormLayOut defaultValues={defaultValues}
                        FormInputFields={leaveFormInputFieldsWithRequestToResponse as FORM_INPUT_PROPS[]}
                        validationRules={LeaveValidation}
                        onSubmit={onSubmit} btnText={'Submit'}/>

        </>
    );
};

export default AddLeave;
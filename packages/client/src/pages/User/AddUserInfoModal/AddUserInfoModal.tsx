import React from 'react';
import CustomModal from "../../../components/organisms/CustomModal/CustomModal";
import {Add} from "@mui/icons-material";
import FormLayOut from "../../../components/organisms/Form/FormLayOut/FormLayOut";
import {userinfoValidation} from "../../../utils/Validation";
import {FORM_INPUT_PROPS, FormInputType, selectOption} from "../../../components/molecules/Form/FormInput/Form_Input";
import {useUsers} from "../../../hooks/useUsers";

import {SubmitHandler} from "react-hook-form";
import {useUserInfo} from "../../../hooks/useUserInfo";

interface ADD_USER_INFO_MODAL_PROPS {

}
interface userInfoFormData {
    user: string,
    contactNumber: string,
    presentAddress: string,
    permanentAddress: string
    dateOfBirth: string,
    eContactNumber: string
}

const defaultValue :userInfoFormData = {
    user: '',
    contactNumber: '',
    presentAddress: '',
    permanentAddress: '',
    dateOfBirth: '',
    eContactNumber: ''


}
 interface userInfoFormField {
    name: string;
     type: FormInputType;
     placeholder: string;
     smallField: boolean;
     label: string;
     selectOptions?: selectOption[];

 }



const AddUserInfoModal: React.FC<ADD_USER_INFO_MODAL_PROPS> = (props): JSX.Element => {

    const {Users} = useUsers();
    const {createUserInfo} = useUserInfo();

    const userInfoFormFields : userInfoFormField[] = [
        {
            name: 'permanentAddress',
            type: 'text',
            placeholder: ' Type Permanent Address',
            smallField: false,
            label: 'Permanent Address'
        },
        {
            name: 'presentAddress',
            type: 'text',
            placeholder: ' Type Present Address',
            smallField: false,
            label: 'Present Address'

        },
        {
            name: 'contactNumber',
            type: 'text',
            placeholder: ' Type Contact Number',
            smallField: true,
            label: 'Contact Number'

        },
        {
            name: 'eContactNumber',
            type: 'text',
            placeholder: ' Type Emergency Contact Number',
            smallField: true,
            label: 'Emergency Contact Number'
        },
        {
            name: 'dateOfBirth',
            type: 'date',
            placeholder: ' Type Date of Birth',
            smallField: true,
            label: 'Date of Birth'
        },
        {
            name: 'user',
            type: 'select',
            placeholder: ' Select User',
            smallField: true,
            label: 'User',
            selectOptions: Users?.map((user) => {
                return {
                    label: user.firstName,
                    value: user._id
                }
            }) as selectOption[]
        }
    ]
    const onSubmit : SubmitHandler<userInfoFormData> = async (data) => {
        console.log(data)
        await createUserInfo(data);
    }

    return (
        <>
            <CustomModal modalId={'add-user-info'} modalContent={
                <FormLayOut defaultValues={{...defaultValue}} FormInputFields={userInfoFormFields as FORM_INPUT_PROPS[]} validationRules={userinfoValidation}
                            onSubmit={onSubmit} btnText={'Submit'}/>
            } modalBtnVariant={`outlined`} ModalBtnIcon={<Add/>} modalBtnText={`Add-user-info`} modalTitle={`Add -user-information`}/>

        </>
    );
};

export default AddUserInfoModal;
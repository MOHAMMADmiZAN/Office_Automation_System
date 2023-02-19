import React, {useLayoutEffect} from 'react';
import CustomModal from "../../../components/organisms/CustomModal/CustomModal";
import {Add} from "@mui/icons-material";
import {FORM_INPUT_PROPS, FormInputType, selectOption} from "../../../components/molecules/Form/FormInput/Form_Input";
import {Actions, useStoreActions} from "easy-peasy";
import {AuthType} from "../../../store/models/AuthModel";
import useAuth from "../../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {SubmitHandler} from "react-hook-form";
import {signupValidation} from "../../../utils/Validation";
import FormLayOut from "../../../components/organisms/Form/FormLayOut/FormLayOut";
import {useQuery} from "react-query";
import {RoleApi} from "../../../api/Role.Api";
import {useUsers} from "../../../hooks/useUsers";
import {useRole} from "../../../hooks/useRole";

interface ADD_USER_MODAL_PROPS {

}

interface RegisterInputField {
    name: string;
    type: FormInputType;
    placeholder: string;
    smallField: boolean;
    label: string;
    selectOptions?: selectOption[];


}



interface RegisterFromData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    avatar: Blob |Object | string;

}

const defaultValues: RegisterFromData = {
    firstName: ``,
    lastName: ``,
    email: ``,
    password: ``,
    role: ``,
    avatar: ``,



}


const AddUserModal: React.FC<ADD_USER_MODAL_PROPS> = (props): JSX.Element => {
     const {Roles} = useRole()

     const {Register} = useUsers();

    const RegisterInputFields: RegisterInputField[] = [
        {
          name: `avatar`,
          type: `file`,
            placeholder: `Upload Your Avatar`,
            smallField: false,
            label: `Avatar`,
        },
        {
            name: `firstName`,
            type: `text`,
            placeholder: `Type Your First Name`,
            smallField: true,
            label: `First Name`,

        },
        {
            name: `lastName`,
            type: `text`,
            placeholder: `Type Your Last Name`,
            smallField: true,
            label: `Last Name`,

        },
        {
            name: `email`,
            type: `email`,
            placeholder: `Type Your Email`,
            smallField: false,
            label: `Email`,

        },
        {
            name: `password`,
            type: `password`,
            placeholder: `Type Your Password`,
            smallField: true,
            label: `Password`,

        },
        {
            name: `role`,
            type: `select`,
            placeholder: `Select Your Role`,
            smallField: true,
            label: `Role`,
            selectOptions: Roles?.filter((r)=>r.name!=='super_admin').map((role) => {
                return {
                    label: role.name,
                    value: role._id
                }
            })

        }

    ];





    const onSubmit: SubmitHandler<RegisterFromData> = async (data,e) => {

        let payload = {
            ...data,
            avatar: e?.target.avatar.files[0]
        }


        await Register(payload)



    }
    return (
        <>
            <CustomModal modalId={'add-user'} modalContent={
                <FormLayOut
                    defaultValues={defaultValues}
                    FormInputFields={RegisterInputFields as FORM_INPUT_PROPS[]}
                    validationRules={signupValidation}
                    onSubmit={onSubmit}
                    btnText={`Register`}/>

            } modalBtnVariant={`outlined`} modalBtnText={`Add User`} ModalBtnIcon={<Add/>} modalTitle={`New User Register`}/>

        </>
    );
};

export default AddUserModal;
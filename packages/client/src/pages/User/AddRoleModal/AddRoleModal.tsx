import React from 'react';
import CustomModal from "../../../components/organisms/CustomModal/CustomModal";
import {Add} from "@mui/icons-material";
import FormLayOut from "../../../components/organisms/Form/FormLayOut/FormLayOut";
import {FORM_INPUT_PROPS, FormInputType} from "../../../components/molecules/Form/FormInput/Form_Input";
import {roleValidation} from "../../../utils/Validation";
import {SubmitHandler} from "react-hook-form";
import {IRolePayload} from "../../../api/Role.Api";
import {useRole} from "../../../hooks/useRole";

interface ADD_ROLE_MODAL_PROPS {

}



const defaultValues = {
    name: '',
}
 interface RoleFormInputField {
    name: string;
    type: FormInputType;
    placeholder: string;
    smallField: boolean;
    label: string;
    id?: string;

 }

const RoleFormFields: RoleFormInputField[] = [
    {
        name: `name`,
        type: `text`,
        placeholder: `Type Your Role Name`,
        smallField: false,
        label: `Role Name`,

    }
]
const AddRoleModal: React.FC<ADD_ROLE_MODAL_PROPS> = (props): JSX.Element => {

   const {createRole} = useRole()
    const onSubmit: SubmitHandler<IRolePayload> = async (data) => {
        await createRole(data)

    }


    return (
        <>
            <CustomModal modalId={'add-role'} modalContent={
                <FormLayOut defaultValues={defaultValues} FormInputFields={RoleFormFields as FORM_INPUT_PROPS[]} validationRules={roleValidation} onSubmit={onSubmit} btnText={'Submit'}/>
            } ModalBtnIcon={<Add/>} modalTitle={`Add-Role`} modalBtnText={`Add Role`} modalBtnVariant={`outlined`}/>

        </>
    );
};

export default AddRoleModal;
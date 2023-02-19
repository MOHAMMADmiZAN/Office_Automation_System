import React from 'react';
import { SubmitHandler } from "react-hook-form";
import FormLayOut from "../../../components/organisms/Form/FormLayOut/FormLayOut";
import { RoleFormFields } from "../AddRoleModal/AddRoleModal";
import { FORM_INPUT_PROPS } from "../../../components/molecules/Form/FormInput/Form_Input";
import { roleValidation } from "../../../utils/Validation";
import { useRole } from '../../../hooks/useRole';
import { IRoleWithId } from '../../../api/Role.Api';

export interface EDIT_ROLE_MODAL_PROPS {
    roleData: IRoleWithId;
}

const EditRoleModal: React.FC<EDIT_ROLE_MODAL_PROPS> = ({ roleData }): JSX.Element => {
    const { editRole } = useRole(roleData._id)


    const onSubmit: SubmitHandler<IRoleWithId> = async (data) => {
        await editRole(data);
    }

    return (
        <>
            <FormLayOut
                defaultValues={roleData}
                FormInputFields={[...RoleFormFields] as FORM_INPUT_PROPS[]}
                validationRules={roleValidation}
                onSubmit={onSubmit} btnText={'Edit Role'} />
        </>
    )
};

export default EditRoleModal;
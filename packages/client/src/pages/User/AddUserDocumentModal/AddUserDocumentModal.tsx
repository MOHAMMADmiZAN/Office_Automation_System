import React from 'react';
import CustomModal from "../../../components/organisms/CustomModal/CustomModal";
import {Add} from "@mui/icons-material";
import {FORM_INPUT_PROPS, FormInputType, selectOption} from "../../../components/molecules/Form/FormInput/Form_Input";
import {SubmitHandler} from "react-hook-form";
import {useDocument} from "../../../hooks/useDocument";
import FormLayOut from "../../../components/organisms/Form/FormLayOut/FormLayOut";
import {DocumentValidation} from "../../../utils/Validation";
import {useUsers} from "../../../hooks/useUsers";

interface ADD_USER_DOCUMENT_MODAL_PROPS {

}

interface documentFormDataType {
    title: string;
    document: Blob | string,
    user: string
}

const defaultValues: documentFormDataType = {
    title: ``,
    document: ``,
    user: ``
}

interface documentFormField {
    name: string;
    type: FormInputType;
    placeholder: string;
    smallField: boolean;
    label: string;
    selectOptions?: selectOption[]

}


const AddUserDocumentModal: React.FC<ADD_USER_DOCUMENT_MODAL_PROPS> = (props): JSX.Element => {
    const {userAllDocument, createDocument} = useDocument()
    const {Users} = useUsers()
    const documentFormFields: documentFormField[] = [
        {
            name: `title`,
            type: `text`,
            placeholder: `Document Title`,
            smallField: false,
            label: `Document Title`

        },
        {
            name: `document`,
            type: `file`,
            placeholder: `Upload Document`,
            smallField: true,
            label: `Document`

        },
        {
            name: `user`,
            type: `select`,
            placeholder: `Select User`,
            smallField: true,
            label: `User`,
            selectOptions: Users?.map((user) => {
                return {
                    value: user._id,
                    label: user.firstName + ` ` + user.lastName
                }
            }) as selectOption[]
        }


    ]


    const onSubmit: SubmitHandler<documentFormDataType> = async (data, e) => {
        const payload = {
            ...data,
            document: e?.target.document.files[0]
        }
        await createDocument(payload)


    }

    return (
        <>
            <CustomModal modalId={'add-Document'} modalContent={
                <FormLayOut defaultValues={defaultValues} FormInputFields={documentFormFields as FORM_INPUT_PROPS[]}
                            validationRules={DocumentValidation}
                            onSubmit={onSubmit} btnText={'Submit Document'}/>
            } modalTitle={`add-document`} ModalBtnIcon={<Add/>} modalBtnText={`Add Document`}
                         modalBtnVariant={`outlined`}/>


        </>
    );
};

export default AddUserDocumentModal;
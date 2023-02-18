import React from 'react';
import CustomModal from "../../../components/organisms/CustomModal/CustomModal";
import {Add} from "@mui/icons-material";

interface ADD_USER_DOCUMENT_MODAL_PROPS {

}

const AddUserDocumentModal: React.FC<ADD_USER_DOCUMENT_MODAL_PROPS> = (props): JSX.Element => {
    return (
        <>
            <CustomModal modalId={'add-Document'} modalContent={<></>} modalTitle={`add-document`} ModalBtnIcon={<Add/>} modalBtnText={`Add Document`} modalBtnVariant={`outlined`}/>


        </>
    );
};

export default AddUserDocumentModal;
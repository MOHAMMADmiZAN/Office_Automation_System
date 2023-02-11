import React, {useState} from 'react';
import {Btn, BtnVariant} from "../../molecules/Form/Btn/Btn";
import Dia from "../../molecules/Dia/Dia";
import {DialogActions, DialogContent, Modal} from '@mui/material';


interface CUSTOM_MODAL_PROPS {
    modalId: string;
    modalTitle?: string;
    modalContent: React.ReactNode;
    modalBtnText?: string;
    modalBtnColor?: string;
    modalBtnVariant?: BtnVariant;
    ModalBtnIcon?: React.ReactNode;


}

const CustomModal: React.FC<CUSTOM_MODAL_PROPS> = ({
                                                       modalId,
                                                       modalContent,
                                                       modalBtnVariant,
                                                       modalBtnText,
                                                       ModalBtnIcon
                                                   }): JSX.Element => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            {!open&& <Btn type={`button`} BtnText={modalBtnText} size={`small`} variant={modalBtnVariant} onClick={handleClickOpen} BtnStartIcon={ModalBtnIcon}/>}
            {
                open && (
                    <Dia id={modalId} onClose={handleClose}>
                        <DialogContent dividers>
                               {modalContent}
                        </DialogContent>
                    </Dia>
                )
            }

        </>
    )
};
export default CustomModal;
import React, {useState} from 'react';
import {Btn, BtnVariant} from "../../molecules/Form/Btn/Btn";
import CustomModalTitle from "../../molecules/CustomModalTitle/CustomModalTitle";
import {DialogActions, DialogContent, Modal} from '@mui/material';
import CommonCard from "../../molecules/CommonCard/CommonCard";
import useStyles from "./styles/CustomModal.style";


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

    const classes = useStyles();
    return (
        <>
            {!open&& <Btn  type={`button`} BtnText={modalBtnText} size={`small`} variant={modalBtnVariant} onClick={handleClickOpen} BtnStartIcon={ModalBtnIcon} className={classes.iconBtn}/>}
            {
                open && (
                    <>
                    <CustomModalTitle id={modalId} onClose={handleClose}/>
                        <DialogContent dividers>
                               <CommonCard  CardMain={modalContent}/>
                        </DialogContent>
                    </>
                )
            }

        </>
    )
};
export default CustomModal;
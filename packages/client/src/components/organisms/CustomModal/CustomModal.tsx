import React, {memo, useState} from 'react';
import {Btn, BtnVariant} from "../../molecules/Form/Btn/Btn";
import CustomModalTitle from "../../molecules/CustomModalTitle/CustomModalTitle";
import {Box, Container, DialogContent, Tooltip} from '@mui/material';
import CommonCard from "../../molecules/CommonCard/CommonCard";
import useStyles from "./styles/CustomModal.style";
import {ToastContainer} from "react-toastify";


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
                                                       ModalBtnIcon,
                                                       modalTitle
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

                <Btn type={`button`} BtnText={modalBtnText} size={`small`} variant={modalBtnVariant}
                     onClick={handleClickOpen} BtnStartIcon={ModalBtnIcon} styles={{maxWidth:'250px'}}/>


            {
                open && (
                    <Box className={classes.modalBody}>
                        <Container>
                            <CustomModalTitle id={modalId} onClose={handleClose}/>
                            <DialogContent dividers>
                                <CommonCard CardMain={modalContent} cardTitle={modalTitle}/>
                            </DialogContent>
                        </Container>
                    </Box>
                )
            }

        </>
    )
};
export default memo(CustomModal);
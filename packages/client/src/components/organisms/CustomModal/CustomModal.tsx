import React, {memo, useState} from 'react';
import {BtnVariant} from "../../molecules/Form/Btn/Btn";
import CustomModalTitle from "../../molecules/CustomModalTitle/CustomModalTitle";
import {Box, Button, Container, DialogContent, Tooltip} from '@mui/material';
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

                <Tooltip title={modalTitle} sx={{margin:'0.5rem'}}>
                 <Button onClick={handleClickOpen} variant={modalBtnVariant}>{ModalBtnIcon}{modalBtnText}</Button>
                </Tooltip>


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
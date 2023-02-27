import React, { memo, useState } from 'react';
import { BtnVariant } from "../../molecules/Form/Btn/Btn";
import CustomModalTitle from "../../molecules/CustomModalTitle/CustomModalTitle";
import { Box, Button, Container, DialogContent, Tooltip } from '@mui/material';
import CommonCard from "../../molecules/CommonCard/CommonCard";
import useStyles from "./styles/CustomModal.style";


interface CUSTOM_MODAL_PROPS {
    modalId: string;
    modalTitle?: string;
    modalContent: React.ReactNode;
    open: boolean;
    handleClose: Function | any;
}

const ChangePasswordModal: React.FC<CUSTOM_MODAL_PROPS> = ({
    modalTitle,
    modalId,
    modalContent,
    open,
    handleClose,
}): JSX.Element => {

    const classes = useStyles();

    if (!open) {
        return <></>
    }

    return (
        <Box className={classes.modalBody}>
            <Container>
                <CustomModalTitle id={modalId} onClose={handleClose} />
                <DialogContent dividers>
                    <CommonCard CardMain={modalContent} cardTitle={modalTitle} />
                </DialogContent>
            </Container>
        </Box>
    )
};
export default memo(ChangePasswordModal);
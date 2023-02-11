import React from 'react';
import {DialogTitle, IconButton} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

interface DIA_PROPS {

    id: string;
    children?: React.ReactNode;
    onClose: () => void;

}

const Dia: React.FC<DIA_PROPS> = (props): JSX.Element => {
    const { children, onClose, ...other } = props;

    return (
        <>
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: "15px",
                            top: "15px",
                            background: "radial-gradient(black, transparent)",
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon color={`error`} />
                    </IconButton>
                ) : null}
            </DialogTitle>
            
        </>
    );
};

export default Dia;
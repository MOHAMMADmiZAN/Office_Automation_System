import {styled} from "@mui/material/styles";
import {Dialog} from "@mui/material";

export const customDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
})) as typeof Dialog;
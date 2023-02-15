import {styled} from "@mui/material/styles";
import {Box, Card, CardContent, CardHeader, Table, TablePagination} from "@mui/material";

export const DataTableLayout = styled(Box)(({theme}) => ({
    width: "100%",
    height: "100%",



})) as typeof Box;

export const DataTableLayoutCard = styled(Card)(({theme}) => ({
    backgroundColor: theme.palette.primary.light,


})) as typeof Card;

export const DataTableLayoutCardHeader = styled(CardHeader)(({theme}) => ({

    '& .MuiTypography-root': {
        fontWeight: "600",
        fontSize: "3rem",
        color: theme.palette.primary.main,
    }

})) as typeof CardHeader;


export const DataTableLayoutCardContent = styled(CardContent)(({theme}) => ({
    padding: "0 0 0 0",
    '& .MuiTableContainer-root': {
        maxHeight: "calc(100vh - 300px)",
    }

} as const)) as typeof CardContent;


export const DataTablePagination = styled(TablePagination)(({theme}) => ({
    '& .MuiTablePagination-toolbar': {
        backgroundColor: theme.palette.primary.light,
        textAlign: "center",
        padding: '20px',

    },
    '& .MuiTablePagination-spacer': {
        display: "none",
    },
    '& .MuiTablePagination-caption': {
        color: theme.palette.primary.main,
    },
    '& .MuiTablePagination-select': {
        color: theme.palette.primary.main,
    },
    '& .MuiTablePagination-selectIcon': {
        color: theme.palette.primary.main,
    },
    '& .MuiTablePagination-actions': {
        '& .MuiIconButton-root': {
            color: theme.palette.primary.main,

        },
        '& .Mui-disabled': {
            color: theme.palette.primary.light,
        }
    },


})) as typeof TablePagination;

export const DataLayoutTable = styled(Table)(({theme}) => ({
    '& .MuiTableHead-root': {
        backgroundColor: theme.palette.primary.light,


    },
    maxHeight: "320px",
    overflow: "auto",


})) as typeof Table;
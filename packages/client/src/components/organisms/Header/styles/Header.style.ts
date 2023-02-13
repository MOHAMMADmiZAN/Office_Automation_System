import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

export const HeaderBox = styled(Box)(({theme}) => ({
    width: '100%',
    backgroundColor: theme.palette.primary.light,
    zIndex: 1000,
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.primary.main,
    padding: '20px 30px',

    '& .MuiSvgIcon-root': {
        color: theme.palette.primary.main,
       margin: '0 15px'
    },
    '& .MuiBadge-root .MuiSvgIcon-root': {
        margin: '0'
    }

})) as typeof Box;

//
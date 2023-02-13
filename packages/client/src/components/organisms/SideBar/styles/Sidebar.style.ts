import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

export const SidebarBox = styled(Box)(({theme}) => ({
    position: 'absolute',
    backgroundColor: theme.palette.primary.light,
    transform: "translateX(-100%)",
    height: 'calc(100% - 90px)',
    transition: "transform 0.5s ease-in-out",
    '&.open': {
        transform: "translateX(0)",
    },
    '& .close': {
        transform: 'translateX(-100%)',
    },
    '& .Active-item': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff !important',
        '& .MuiSvgIcon-root': {
            color: '#fff !important',
        }
    },

    '& .MuiList-root': {
        marginTop: '20px',

        '& .MuiListItem-root': {
            color: theme.palette.primary.main,
            '& .MuiSvgIcon-root': {
                color: theme.palette.primary.main,
            },
            transition: 'all 0.3s ease-in-out',
        },
        '& .MuiListItem-root:hover': {
            backgroundColor: theme.palette.primary.main,
            color: '#fff',
            '& .MuiSvgIcon-root': {
                color: '#fff',
            }
        },
        '& .MuiDivider-root': {
            backgroundColor: theme.palette.primary.main,
            border: '1px solid',
            borderColor: theme.palette.primary.main,
        }


    }


})) as typeof Box;

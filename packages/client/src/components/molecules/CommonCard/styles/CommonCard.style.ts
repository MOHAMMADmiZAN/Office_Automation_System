import {styled} from "@mui/material/styles";
import {Card, CardContent, CardHeader} from "@mui/material";

export const CommonCardHeader = styled(CardHeader)(({theme}) => ({

    '& .MuiTypography-root':{
        fontWeight: "600",
        fontSize: "3rem",
        color: theme.palette.primary.main,
    }

})) as typeof CardHeader;


export const CommonCardLayout = styled(Card)(({theme}) => ({
    backgroundColor: theme.palette.primary.light,
    margin: "1rem 0.2rem"

})) as typeof Card;

export const CommonCardContent = styled(CardContent)(({theme}) => ({

})) as  typeof  CardContent;
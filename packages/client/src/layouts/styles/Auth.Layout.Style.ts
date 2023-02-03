import {styled} from "@mui/material/styles";
import {Box, Card, CardContent, CardHeader} from "@mui/material";

export const AuthLayoutBox = styled(Box)(({theme}) => ({
    width: "100%",
    height: "100vh",
    display: "flex",
    padding: "120px 0",
    justifyContent: "center",


})) as typeof Box;



export const AuthLayoutCardHeader = styled(CardHeader)(({theme}) => ({

    '& .MuiTypography-root':{
        fontWeight: "600",
        fontSize: "3rem",
        color: theme.palette.primary.main,
    }

})) as typeof CardHeader;


export const AuthLayOutCard = styled(Card)(({theme}) => ({
    backgroundColor: theme.palette.primary.light,

})) as typeof Card;

export const AuthLayoutCardContent = styled(CardContent)(({theme}) => ({

})) as  typeof  CardContent;
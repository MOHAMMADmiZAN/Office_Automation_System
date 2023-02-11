import {styled} from "@mui/material/styles";
import {Box, Card, CardContent, CardHeader} from "@mui/material";

export const AuthLayoutBox = styled(Box)(({theme}) => ({
    width: "100%",
    height: "100vh",
    display: "flex",
    padding: "120px 0",
    justifyContent: "center",


})) as typeof Box;

import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";


export const AttendanceTypography = styled(Typography)(({theme}) => ({
    color: theme.palette.primary.main,
    fontSize: "1rem",
    fontWeight: 600,
    textAlign: "center",
    textTransform: "capitalize",
    padding: "0.5rem",

})) as typeof Typography;

export const AttendanceBox = styled(Box)(({theme}) => ({
    width: "100%",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: theme.palette.primary.light,
    borderRadius: "0.5rem",
    margin: '5px 0'

})) as typeof Box;

export const AttendanceActionBox = styled(Box)(({theme}) => ({
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-around",
    fontSize: "0.5rem",


})) as typeof Box;
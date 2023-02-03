import {CustomTheme} from "./theme.dto";
import {createTheme} from "@mui/material";

export const createCustomTheme = (customTheme: CustomTheme)  => {
    return createTheme(customTheme)
}
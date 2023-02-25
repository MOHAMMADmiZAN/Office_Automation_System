import {CustomTheme} from "./theme.interface";
import {createTheme} from "@mui/material";

export const createCustomTheme = (customTheme: CustomTheme) => {
    return createTheme(customTheme)
}
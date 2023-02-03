import {CustomTheme} from "./theme.dto";
import {createCustomTheme} from "./utils.theme";

const customTheme: CustomTheme = {
    palette: {
        primary: {
            main: '#20846A',
            light: 'rgba(32,132,106,0.08)',
            dark: '#20846A',

        },
        secondary: {
            main: 'rgba(32,132,106,0.08)',

        },
        text: {
            primary: '#91B7B9',
            secondary: '#fff',
        },
        background: {
            default: '#161618',
        },


    },
    typography: {
        fontFamily: 'Rajdhani, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.01562em',

        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.00833em',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '0em',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
        }

    },
}





export const theme = createCustomTheme(customTheme)




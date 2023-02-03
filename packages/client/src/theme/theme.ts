import {CustomTheme} from "./theme.interface";
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
        error: {
            main: '#F44336',
            light: '#E57373',
            dark: '#D32F2F',
            contrastText: '#fff',

        },
        text: {
            primary: '#91B7B9',
            secondary: '#fff',
        },
        background: {
            default: '#161618',
            secondary: 'rgba(32,132,106,0.08)',
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
            letterSpacing: '0.00735em',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '0em',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '0.0075em',
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '0.00938em',
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '0.00714em',
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '0.00938em',
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '0.01071em',
        },


    },
    // Divider Style overrides
    components: {
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: '#91B7B9',
                    border: '1.2px solid #91B7B9',
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '2px 2px 3px 3px #91B7B9',
                }
            }
        }
    },


}


export const theme = createCustomTheme(customTheme)




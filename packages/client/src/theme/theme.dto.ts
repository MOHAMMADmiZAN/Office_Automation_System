// theme palette color interface
interface PaletteColor {
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
}


// custom theme interface
    export interface CustomTheme {
        palette: {
            primary: PaletteColor;
            secondary: PaletteColor;
            text: {
                primary: string;
                secondary: string;
            }
            background: {
                default: string;
            },


        },
        typography: {
            fontFamily: string;
            h1: {
                fontSize: string;
                fontWeight: number;
                lineHeight: number;
                letterSpacing: string;

            },
            h2: {
                fontSize: string;
                fontWeight: number;
                lineHeight: number;
                letterSpacing: string;

            },
            h3: {
                fontSize: string;
                fontWeight: number;
                lineHeight: number;
                letterSpacing: string;

            },
            h4: {
                fontSize: string;
                fontWeight: number;
                lineHeight: number;

            },

        }
    }



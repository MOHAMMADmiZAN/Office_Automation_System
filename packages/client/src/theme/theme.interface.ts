// theme palette color interface
interface PaletteColor {
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
}

interface TypographyFontStyle {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: string;

}

// custom theme interface
export interface CustomTheme {
    palette: {
        primary: PaletteColor;
        secondary: PaletteColor;
        error: PaletteColor;
        text: {
            primary: string;
            secondary: string;
        }
        background: {
            default: string;
            secondary: string;
        },


    },
    typography: {
        fontFamily: string;
        h1: TypographyFontStyle;
        h2: TypographyFontStyle;
        h3: TypographyFontStyle;
        h4: TypographyFontStyle;
        h5: TypographyFontStyle;
        h6: TypographyFontStyle;
        subtitle1: TypographyFontStyle;
        subtitle2: TypographyFontStyle;
        body1: TypographyFontStyle;
        body2: TypographyFontStyle;


    },
    // Divider Style overrides
    components: {
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: string;
                    border: string;

                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: string;
                }
            }
        }
    }
}



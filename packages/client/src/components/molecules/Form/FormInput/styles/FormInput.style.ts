// input style emotion styled component
import {Button, InputLabel, OutlinedInput, Select, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";

export const Form_TextInput = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-root': {

        '& fieldset': {
            borderColor: theme.palette.primary.main,
            padding: '0 0.5rem',
        },

    },
    '& .MuiOutlinedInput-root:hover': {
        '& fieldset': {}
    },
    '& .MuiOutlinedInput-root.Mui-focused': {},
    '& .MuiOutlinedInput-input': {
        color: theme.palette.text.primary,
    },
    '& .MuiInputLabel-outlined': {
        color: theme.palette.text.primary,
        latterSpacing: '0.1rem',

        '&.MuiInputLabel-shrink': {
            color: theme.palette.text.primary,
            '&.Mui-focused': {
                color: theme.palette.text.primary,
            }

        },


    },
    '& .Mui-error': {
        color: theme.palette.error.main,
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.text.primary,
        '&.Mui-error': {
            color: theme.palette.error.main,
        }
    },
    '& .MuiFormHelperText-root': {
        color: theme.palette.text.primary,
        '&.Mui-error': {
            color: theme.palette.error.main,
        }
    },
    '& .MuiSvgIcon-root': {
        color: theme.palette.text.primary,
    }


})) as typeof TextField


export const Form_OutlinedInput = styled(OutlinedInput)(({theme}) => ({
    width: '100%',
    ...Form_TextInput,
})) as unknown as typeof OutlinedInput

export const Form_Select = styled(Select)(({theme}) => ({
    minWidth: '10rem',
    '& .MuiSelect-select': {
        color: theme.palette.text.primary,
    },
    '& .MuiSvgIcon-root': {
        color: theme.palette.text.primary,
    },
    '& fieldset': {
        borderColor: theme.palette.primary.main,
        padding: '0 0.5rem',
    }
})) as unknown as typeof Select

export const FromSelectLabel = styled(InputLabel)(({theme}) => ({
    top: '-6px',
    padding: '0 0.5rem',

    '&.MuiInputLabel-shrink': {
        top: 0,
        color: theme.palette.text.primary,
    }

})) as typeof InputLabel

export const Form_uploadBox = styled(Button)(({theme}) => ({
    width: '250px',
    border: `1px dashed ${theme.palette.primary.main}`,
    height: '10rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',


})) as typeof Button
import React, {memo} from 'react';
import {Control, UseFormRegister} from "react-hook-form/dist/types/form";
import {Controller} from "react-hook-form";
import {
    Form_OutlinedInput,
    Form_Select,
    Form_TextInput,
    Form_uploadBox,
    FromSelectLabel
} from "./styles/FormInput.style";

import {FormControl, MenuItem, TextField, Typography} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DateTimePicker} from "@mui/x-date-pickers";


export type FormInputType =
    'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'date'
    | 'time'
    | 'url'
    | 'search'
    | 'color'
    | 'file'
    | 'range'
    | 'month'
    | 'week'
    | 'datetime-local'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'textarea';


const FormTextInputType: FormInputType[] = ['text', 'email', 'password', 'number', 'tel']
const FormSelectInputType: FormInputType[] = ['select']
const FormCheckboxInputType: FormInputType[] = ['checkbox']
const FormRadioInputType: FormInputType[] = ['radio']
const FormTextAreaInputType: FormInputType[] = ['textarea']
const FormDateInputType: FormInputType[] = ['date', 'time', 'month', 'week', 'datetime-local']
const FormFileInputType: FormInputType[] = ['file']
const FormColorInputType: FormInputType[] = ['color']
const FormRangeInputType: FormInputType[] = ['range']
const FormUrlInputType: FormInputType[] = ['url']
const FormSearchInputType: FormInputType[] = ['search']

interface selectOption {
    value: string;
    label: string;
}

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: `10rem`,
        },
    },
};


export interface FORM_INPUT_PROPS {
    type: FormInputType;
    name: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    smallField?: boolean;
    label?: string;
    isRequired?: boolean;
    control: Control<any>
    isFullWidth?: boolean,
    id?: string
    selectOptions?: selectOption[],


}


const FormInput: React.FC<FORM_INPUT_PROPS> = ({
                                                   type,
                                                   name,
                                                   placeholder,
                                                   label,
                                                   isRequired,
                                                   control,
                                                   isFullWidth,
                                                   id,
                                                   selectOptions,
                                                   smallField
                                               }): JSX.Element => {


    return (
        <>
            <FormControl sx={{margin: '1rem 0.2rem',width: smallField ? '49%' : '100%'}}>
                {
                    FormTextInputType.includes(type) && (
                        <Controller render={({field, fieldState: {error}, formState: {isValid}}) => {
                            return (
                                <Form_TextInput
                                    type={type}
                                    {...field}
                                    placeholder={placeholder}
                                    label={label?.toUpperCase()}
                                    required={isRequired}
                                    error={!!error?.message}
                                    helperText={isValid ? '' : error?.message}
                                    size={`small`}
                                    fullWidth={isFullWidth}

                                />
                            )
                        }} control={control} name={name}/>

                    )
                }
                {
                    FormSelectInputType.includes(type) && (
                        <Controller render={({field, fieldState: {error}, formState: {isValid}}) => {
                            return (
                                <>
                                    <FromSelectLabel id={id}>{label?.toUpperCase()}</FromSelectLabel>
                                    <Form_Select
                                        labelId={id}
                                        input={<Form_OutlinedInput label={label?.toUpperCase()} size={'small'}/>}
                                        MenuProps={MenuProps}
                                        variant={`outlined`}
                                        required={isRequired}
                                        error={!!error?.message}
                                        size={`small`}
                                        sx={{width: isFullWidth ? '100%' : '250px'}}

                                        {...field}
                                    >
                                        {selectOptions?.map((opt) => (
                                            <MenuItem
                                                key={opt.label}
                                                value={opt.value}
                                            >
                                                {opt.value}
                                            </MenuItem>
                                        ))}
                                    </Form_Select>
                                </>
                            )


                        }
                        } control={control} name={name}/>
                    )

                }
                {
                    FormTextAreaInputType.includes(type) && (
                        <Controller render={({field, fieldState: {error}, formState: {isValid},}) => {
                            return (
                                <Form_TextInput {...field} placeholder={placeholder} type={type}
                                                label={label?.toUpperCase()}
                                                required={isRequired}
                                                error={!!error?.message}
                                                helperText={isValid ? '' : error?.message}
                                                size={`small`}
                                                fullWidth={isFullWidth}
                                                rows={4}
                                                multiline


                                />
                            )
                        }} control={control} name={name}/>

                    )

                }
                {
                    FormFileInputType.includes(type) && (
                        <Controller render={({field, fieldState: {error}, formState: {isValid},}) => {
                            return (
                                <Form_uploadBox component="label">
                                    <input type={type} id={name} hidden={true} {...field} />
                                    <Typography variant={`h6`} component={`h6`} sx={{textTransform: 'capitalize'}}>{label}</Typography>
                                    <CloudUploadIcon sx={{color: 'primary.main', marginLeft: '5px'}}/>
                                </Form_uploadBox>
                            )
                        }
                        } control={control} name={name}/>
                    )
                }
                {
                    FormDateInputType.includes(type) && (

                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <Controller
                                name={name}
                                control={control}
                                render={({field, fieldState: {error}, formState: {isValid}}) => (
                                    <DateTimePicker
                                        {...field} label={label}
                                        renderInput={(prams) => <Form_TextInput {...prams} error={!!error?.message}
                                                                                helperText={isValid ? '' : error?.message}
                                                                                size={`small`}
                                                                                sx={{width: isFullWidth ? '100%' : '250px'}}


                                        />}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    )

                }

            </FormControl>

        </>)
};

export default memo(FormInput)
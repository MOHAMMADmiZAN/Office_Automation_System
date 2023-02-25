import React, {memo, useState} from 'react';
import {Control} from "react-hook-form/dist/types/form";
import {Controller} from "react-hook-form";
import {
    Form_OutlinedInput,
    Form_Select,
    Form_TextInput,
    Form_uploadBox,
    FromSelectLabel,
} from "./styles/FormInput.style";

import {FormControl, FormHelperText, MenuItem, Typography} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DatePicker, DateTimePicker} from "@mui/x-date-pickers";
import Select from "react-select";
import makeAnimated from 'react-select/animated';


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
    | 'textarea'
    | 'autocomplete'
    | 'avatar'


const FormTextInputType: FormInputType[] = ['text', 'email', 'password', 'number', 'tel']
const FormSelectInputType: FormInputType[] = ['select']
const FormCheckboxInputType: FormInputType[] = ['checkbox']
const FormRadioInputType: FormInputType[] = ['radio']
const FormTextAreaInputType: FormInputType[] = ['textarea']
const FormDateInputType: FormInputType[] = ['date', 'datetime-local']
const FormFileInputType: FormInputType[] = ['file']
const FormColorInputType: FormInputType[] = ['color']
const FormRangeInputType: FormInputType[] = ['range']
const FormUrlInputType: FormInputType[] = ['url']
const FormSearchInputType: FormInputType[] = ['search']
const FormAutocompleteInputType: FormInputType[] = ['autocomplete']
const FormAvatarInputType: FormInputType[] = ['avatar']

function isDateLocal(value: string): value is "date-local" {
    return true
}

function isAvatar(value: string): { borderRadius: string; width: string; height: string } {
    if (value === "avatar") {
        return {borderRadius: "50%", width: "10rem", height: "10rem"};
    }
    return {borderRadius: "4px", width: "100%", height: "2.4rem"};

}

export interface selectOption {
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
    valueSet?: Function,


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
                                                   smallField,
                                                   valueSet,
                                               }): JSX.Element => {

    const [previewUrl, setPreview] = useState<string>('');


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const file = e.target.files?.[0];
        // @ts-ignore
        valueSet(name, file)
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreview(fileReader.result as string);
        };
        fileReader.readAsDataURL(file as Blob);
    }


    return (
        <>
            <FormControl sx={{margin: '1rem 0.2rem', width: smallField ? '49%' : '100%'}}>
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

                                        {...field}
                                    >
                                        {selectOptions?.map((opt) => (
                                            <MenuItem
                                                key={opt.label}
                                                value={opt.value}
                                            >
                                                {opt.label}
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
                                                rows={6}
                                                multiline


                                />
                            )
                        }} control={control} name={name}/>

                    )

                }
                {FormFileInputType.includes(type) && (
                    <Controller
                        control={control}
                        name={name}
                        render={({field: {onChange, value}, fieldState: {error}, formState: {isValid}}) => (
                            <>

                                <Form_uploadBox component="label" sx={{
                                    ...isAvatar(name),
                                    borderColor: error ? 'error.main' : 'primary.main',
                                    color: error ? 'error.main' : 'primary.main'
                                }}>
                                    <>
                                        {typeof value === 'string' && value.length > 0 ? setPreview(value) : null}
                                        <input
                                            type={type}
                                            id={name}
                                            hidden
                                            onChange={(e) => {
                                                handleFileChange(e, name);
                                            }}
                                        />
                                        {value && previewUrl ?
                                            <img src={previewUrl} alt="previewUrl" width={`100%`} height={`100%`}
                                                 style={{objectFit: "cover"}}/> :
                                            <>
                                                <Typography variant="h6" component="h6"
                                                            sx={{textTransform: 'capitalize'}}>
                                                    {label}
                                                </Typography>
                                                <CloudUploadIcon sx={{
                                                    color: error ? 'error.main' : 'primary.main',
                                                    marginLeft: '5px'
                                                }}/>
                                            </>
                                        }
                                    </>

                                </Form_uploadBox>
                                {
                                    error && <FormHelperText error={!!error?.message}
                                                             sx={{color: 'error.main'}}>{error?.message}</FormHelperText>
                                }
                            </>
                        )}
                    />
                )}


                {
                    FormDateInputType.includes(type) && (
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <Controller
                                name={name}
                                control={control}
                                render={({field, fieldState: {error}, formState: {isValid}}) =>
                                    isDateLocal(type) ? (
                                        <DateTimePicker
                                            {...field}
                                            label={label}
                                            renderInput={(params) => (
                                                <Form_TextInput
                                                    {...params}
                                                    error={!!error?.message}
                                                    helperText={isValid ? '' : error?.message}
                                                    size={`small`}
                                                />
                                            )}
                                        />
                                    ) : (
                                        <DatePicker
                                            {...field}
                                            label={label}
                                            renderInput={(params) => (
                                                <Form_TextInput
                                                    {...params}
                                                    error={!!error?.message}
                                                    helperText={isValid ? '' : error?.message}
                                                    size={`small`}
                                                />
                                            )}
                                        />
                                    )
                                }
                            />
                        </LocalizationProvider>
                    )}

                {
                    selectOptions && FormAutocompleteInputType.includes(type) && (
                        <Controller render={({field, fieldState: {error}, formState: {isValid},}) => {
                            const animatedComponents = makeAnimated();

                            return (
                                <Select
                                    {...field}
                                    isMulti
                                    components={animatedComponents}
                                    options={selectOptions}
                                    placeholder={placeholder}
                                    className={`basic-multi-select`}
                                    classNamePrefix={`select`}


                                />
                            )
                        }
                        } control={control} name={name}/>
                    )

                }

            </FormControl>

        </>)
};

export default memo(FormInput)
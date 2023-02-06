import React from 'react';
import {Box, Grid} from "@mui/material";
import Form_Input, {FORM_INPUT_PROPS} from "../../components/molecules/Form/FormInput/Form_Input";
import Btn from "../../components/molecules/Form/Btn";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {AnyObjectSchema} from "yup";


interface defaultValueType {
    [key: string]: unknown
}
interface FORM_LAY_OUT_PROPS {
    defaultValues: object;
    FormInputFields: FORM_INPUT_PROPS[];
    validationRules: AnyObjectSchema;
    onSubmit: SubmitHandler<any>;
    btnText: string;



}

const FormLayOut: React.FC<FORM_LAY_OUT_PROPS> = ({defaultValues,onSubmit,validationRules,FormInputFields,btnText}): JSX.Element => {
    const {control, handleSubmit} = useForm<typeof defaultValues>({
        defaultValues: {...defaultValues},
        resolver: yupResolver(validationRules),
    });

    return (
        <>
            <Grid container={true} justifyContent={`center`} alignItems={`center`}>
                <Grid item={true} xs={12} sm={12} md={10} lg={10} xl={10}>
                    <Box component={`form`} onSubmit={handleSubmit(onSubmit)} padding={`60px 0`} display={`flex`}
                         flexWrap={`wrap`} justifyContent={`space-between`}>
                        {
                            FormInputFields.map((inputField, index) => {
                                return (
                                    <Form_Input
                                        key={index}
                                        name={inputField.name}
                                        type={inputField.type}
                                        placeholder={inputField.placeholder}
                                        smallField={inputField.smallField}
                                        label={inputField.label}
                                        control={control}
                                        selectOptions={inputField.selectOptions}
                                        isFullWidth={inputField.isFullWidth}
                                        isRequired={inputField.isRequired}
                                        id={inputField.id}



                                    />
                                );
                            })

                        }
                        <Btn type={`submit`} BtnText={btnText} variant={`contained`} size={`medium`}/>
                    </Box>
                </Grid>
            </Grid>

        </>
    );
};

export default FormLayOut;
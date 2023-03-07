import React, {memo} from 'react';
import {Box, Grid} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {AnyObjectSchema} from "yup";
import Form_Input, {FORM_INPUT_PROPS} from "../../../molecules/Form/FormInput/Form_Input";
import Btn from "../../../molecules/Form/Btn";


interface defaultValueType {
    [key: string]: unknown
}

interface FORM_LAY_OUT_PROPS {
    defaultValues: object;
    FormInputFields: FORM_INPUT_PROPS[];
    validationRules: AnyObjectSchema;
    onSubmit: SubmitHandler<any>;
    btnText: string;
    isReset?: boolean;


}

const FormLayOut: React.FC<FORM_LAY_OUT_PROPS> = ({
                                                      defaultValues,
                                                      onSubmit,
                                                      validationRules,
                                                      FormInputFields,
                                                      btnText,
                                                     isReset = false
                                                  }): JSX.Element => {
    const {control, handleSubmit, reset, setValue} = useForm<typeof defaultValues>({
        defaultValues: {...defaultValues},
        resolver: yupResolver(validationRules),
    });


    const onSubmitWithReset: SubmitHandler<any> = async (data, event) => {
        await onSubmit(data, event);
        if (isReset) {
            reset(defaultValues);
        }

    };


    return (
        <>
            <Grid container={true} justifyContent={`center`} alignItems={`center`}>
                <Grid item={true} xs={12} sm={12} md={10} lg={10} xl={10}>
                    <Box component={`form`} onSubmit={handleSubmit(onSubmitWithReset)} padding={`60px 0`}
                         display={`flex`}
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
                                        valueSet={setValue}


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

export default memo(FormLayOut)
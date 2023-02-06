import React from 'react';
import {FORM_INPUT_PROPS, FormInputType} from "../../../molecules/Form/FormInput/Form_Input";
import {SubmitHandler} from "react-hook-form";
import {loginValidation} from "../../../../utils/Validation /Validation";
import FormLayOut from "../../../../layouts/childLayout/FormLayOut";


interface loginInputField {
    name: string;
    type: FormInputType;
    placeholder: string;
    smallField: boolean;
    label: string;
}


const loginInputFields: loginInputField[] = [
    {
        name: `email`,
        type: `email`,
        placeholder: `Type Your Email`,
        smallField: false,
        label: `Email`,
    },
    {
        name: `password`,
        type: `password`,
        placeholder: `Type Your Password`,
        smallField: false,
        label: `Password`,
    }
];

interface LoginFromData {
    email: string;
    password: string;
}

const defaultValues : LoginFromData = {
    email: ``,
    password: ``,
}

const Login: React.FC = (): JSX.Element => {
    const onSubmit: SubmitHandler<LoginFromData> = (data) => {
        console.log(data)


    }
    return (
        <FormLayOut defaultValues={defaultValues} FormInputFields={loginInputFields as FORM_INPUT_PROPS[]} validationRules={loginValidation} onSubmit={onSubmit} btnText={`Login`}/>
    );
};

export default Login;
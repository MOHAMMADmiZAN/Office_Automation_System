import React from 'react';
import {FORM_INPUT_PROPS, FormInputType} from "../../../molecules/Form/FormInput/Form_Input";
import {SubmitHandler} from "react-hook-form";
import {signupValidation} from "../../../../utils/Validation";
import FormLayOut from "../../../../layouts/childLayout/FormLayOut";


interface RegisterInputField {
    name: string;
    type: FormInputType;
    placeholder: string;
    smallField: boolean;
    label: string;


}

const RegisterInputFields: RegisterInputField[] = [
    {
        name: `firstName`,
        type: `text`,
        placeholder: `Type Your First Name`,
        smallField: true,
        label: `First Name`,
       
    },
    {
        name: `lastName`,
        type: `text`,
        placeholder: `Type Your Last Name`,
        smallField: true,
        label: `Last Name`,
       
    },
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
        smallField: true,
        label: `Password`,
       
    },
    {
        name: `confirmPassword`,
        type: `password`,
        placeholder: `Confirm Your Password`,
        smallField: true,
        label: `Confirm Password`,
       
    }
];

interface RegisterFromData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;

}
const defaultValues: RegisterFromData  ={
    firstName: ``,
    lastName: ``,
    email: ``,
    password: ``,
    confirmPassword: ``
}

const Register: React.FC = (): JSX.Element => {

    const onSubmit : SubmitHandler<RegisterFromData> = (data) => {
        console.log(data)
    }


    return (
        <FormLayOut defaultValues={defaultValues} FormInputFields={RegisterInputFields as FORM_INPUT_PROPS[]} validationRules={signupValidation} onSubmit={onSubmit} btnText={`Register`}/>
    );
};

export default Register;
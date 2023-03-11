import {SubmitHandler} from "react-hook-form";
import {Actions, useStoreActions} from "easy-peasy";

import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {FORM_INPUT_PROPS, FormInputType} from "../../components/molecules/Form/FormInput/Form_Input";
import {AuthType} from "../../store/models/AuthModel";
import FormLayOut from "../../components/organisms/Form/FormLayOut/FormLayOut";
import {loginValidation} from "../../utils/Validation";
import AuthLayout from "../../layouts/Auth.Layout";
import useAuth from "../../hooks/useAuth";


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

const defaultValues: LoginFromData = {
    email: ``,
    password: ``,
}

const Login: React.FC = (): JSX.Element => {


    const LogIn = useStoreActions((actions: Actions<AuthType>) => actions.Auth.Login);
    const {isAuth} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        isAuth && navigate(`/`, {replace: true});
    }, [isAuth]);

    const onSubmit: SubmitHandler<LoginFromData> = async (data) => {
        await LogIn(data) && navigate(`/`);


    }
    return (
        <AuthLayout main={
            <FormLayOut defaultValues={defaultValues}
                        FormInputFields={loginInputFields as FORM_INPUT_PROPS[]}
                        validationRules={loginValidation}
                        onSubmit={onSubmit}
                        btnText={`Login`}/>

        } pageTitle={`Login`}/>
    );
};

export default Login;
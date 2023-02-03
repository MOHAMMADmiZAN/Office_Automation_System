import React from 'react';
import AuthLayout from "../../layouts/Auth.Layout";
import Register from "../../components/organisms/Auth/Register";

interface REGISTER_PROPS {

}

const Register_Page: React.FC<REGISTER_PROPS> = (props): JSX.Element => {
    return (
        <>
            <AuthLayout main={<Register/>} pageTitle={`Register`}/>

        </>
    );
};

export default Register_Page;
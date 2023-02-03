import React from 'react';
import Login from '../../components/organisms/Auth/Login/';
import AuthLayout from "../../layouts/Auth.Layout";


interface LOGIN_PAGE_PROPS {
    
}

const Login_Page: React.FC<LOGIN_PAGE_PROPS> = (props): JSX.Element => {

    return (

            <AuthLayout main={<Login/>} pageTitle={`Login`}/>

    );
};

export default Login_Page;
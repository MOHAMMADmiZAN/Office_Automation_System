import React, { useLayoutEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";






const Index: React.FC = (): JSX.Element => {
    const navigation = useNavigate();
    const {isAuth} = useAuth();
    useLayoutEffect(() => {
        !isAuth && navigation("/login");
       },[isAuth]);

    

    return (
        <>

        </>
    )
            


};

export default Index;
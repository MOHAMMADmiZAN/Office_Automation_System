import React, {useLayoutEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import BaseLayout, {baseComponentItem} from "../../layouts/Base.Layout";
import Event from "../../components/organisms/event/event";



 const HomeComponents: baseComponentItem[] = [
     {
            id: 'event',
            component: <Event/>
     },
     {
            id: 'userContact',
            component: <div>User Contact</div>
     }
     ]


const Index: React.FC = (): JSX.Element => {
    const navigation = useNavigate();
    const {isAuth} = useAuth();
    useLayoutEffect(() => {
        !isAuth && navigation("/login");
       },[isAuth]);




    return (
        <BaseLayout baseComponents={HomeComponents} />
    )
            


};

export default Index;
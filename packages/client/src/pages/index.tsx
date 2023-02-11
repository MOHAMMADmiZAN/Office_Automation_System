import React, { useLayoutEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import CustomModal from "../components/organisms/CustomModal/CustomModal";
import {Logout} from "@mui/icons-material";





const Index: React.FC = (): JSX.Element => {
    const navigation = useNavigate();
    const {isAuth} = useAuth();
    useLayoutEffect(() => {
        !isAuth && navigation("/login");
       },[isAuth]);

    

    return (
        <>

      <CustomModal  modalContent={<h1>hello</h1>} modalId={`1`} ModalBtnIcon={<Logout color={`error`}/>}/>
        </>
    )
            


};

export default Index;
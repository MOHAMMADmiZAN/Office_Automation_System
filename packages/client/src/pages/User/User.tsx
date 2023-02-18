import React from 'react';
import AddRoleModal from "./AddRoleModal/AddRoleModal";
import AddUserModal from "./AddUserModal/AddUserModal";
import AddUserDocumentModal from "./AddUserDocumentModal/AddUserDocumentModal";
import UserDataTable from "./UserDataTable/UserDataTable";
import CommonCard from "../../components/molecules/CommonCard/CommonCard";
import AddUserInfoModal from "./AddUserInfoModal/AddUserInfoModal";

interface USER_PROPS {

}

const User: React.FC<USER_PROPS> = (props): JSX.Element => {
    return (
        <>

            <AddRoleModal/>
            <AddUserModal/>
            <AddUserInfoModal/>
            <AddUserDocumentModal/>
            <CommonCard CardMain={<UserDataTable/>} cardTitle={`Users list`}/>


        </>
    );
};

export default User;
import React from 'react';
import AddRoleModal from "./AddRoleModal/AddRoleModal";

interface USER_PROPS {

}

const User: React.FC<USER_PROPS> = (props): JSX.Element => {
    return (
        <>

            <AddRoleModal/>


        </>
    );
};

export default User;
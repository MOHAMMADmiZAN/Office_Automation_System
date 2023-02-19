import React from 'react';
import AddRoleModal from "./AddRoleModal/AddRoleModal";
import RoleDataTable from "./RoleDataTable/RoleDataTable";
import CommonCard from "../../components/molecules/CommonCard/CommonCard";

interface ROLE_PROPS {
}

const Role: React.FC<ROLE_PROPS> = (props): JSX.Element => {
    return (
        <>
            <AddRoleModal />
            <CommonCard CardMain={<RoleDataTable />} cardTitle={`Role list`} />
        </>
    );
};

export default Role;
import React from 'react';
import DataTable, {DataTableData} from "../../../components/organisms/DataTable/DataTable";
import {useQuery} from "react-query";
import {UserApi} from "../../../api/User.api";
import {useUsers} from "../../../hooks/useUsers";
import {useRole} from "../../../hooks/useRole";
import {useUserInfo} from "../../../hooks/useUserInfo";
import {ViewAgenda} from "@mui/icons-material";
import Btn from "../../../components/molecules/Form/Btn";
import {Box} from "@mui/material";

interface USER_DATA_TABLE_PROPS {

}
const dataTableData:DataTableData = {
    label: 'User Data Table',
    headerRow: {
        tableCell: [
            {
                align: 'center',
                value: 'Name'
            },
            {
                align: 'center',
                value: 'Email'
            },
            {
                align: 'center',
                value: 'Phone'
            },
            {
                align: 'center',
                value: 'Role'
            },
            {
                align: 'center',
                value: 'Actions'
            }
        ]

    },
    bodyRow: [],
    DataTablePagination: {
        rowsPerPage: [5, 10, 25]
    }
}

const UserDataTable: React.FC<USER_DATA_TABLE_PROPS> = (props): JSX.Element => {
    const {Users} = useUsers()
    const {Roles} = useRole()
    const {userBasicInfo} = useUserInfo()


    const bodyRow: DataTableData["bodyRow"] = [];

    if (Users) {
        Users.map((user) => {
          const userInfo = userBasicInfo?.find((info) => info.user === user._id)
            bodyRow.push({
                tableCell: [
                    {
                        align: 'center',
                        value: user.firstName + ' ' + user.lastName
                    },
                    {
                        align: 'center',
                        value: user.email
                    },
                    {
                        align: 'center',
                        value: userInfo?.contactNumber
                    },
                    {
                        align: 'center',
                        value: Roles?.find((role) => role._id === user.role)?.name
                    },
                    {
                        align: 'center',
                        value: <Btn styles={{margin:'0',width:'200px'}} BtnStartIcon={<ViewAgenda/>} BtnText={`View Full Information`} variant={`outlined`}/>
                    }

                ],

            })
        })
    }


    return (
     <Box sx={{padding:'24px'}}>
         <DataTable DataTableData={{...dataTableData,bodyRow}}/>
     </Box>
    );
};

export default UserDataTable;
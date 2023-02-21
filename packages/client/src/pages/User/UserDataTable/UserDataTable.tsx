import React from 'react';
import DataTable, {DataTableData} from "../../../components/organisms/DataTable/DataTable";
import {useUsers} from "../../../hooks/useUsers";
import {useRole} from "../../../hooks/useRole";
import {useUserInfo} from "../../../hooks/useUserInfo";
import {Box, Tooltip} from "@mui/material";
import {NavLink} from "react-router-dom";
import PreviewIcon from '@mui/icons-material/Preview';
import {useOnBoard} from "../../../hooks/useOnBoard";

interface USER_DATA_TABLE_PROPS {

}

const dataTableData: DataTableData = {
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
                value: 'Designation'
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
    const { Users } = useUsers()
    const { Roles, checkUserPermission } = useRole()
    const { userBasicInfo} = useUserInfo()
    const {OnBoardData}= useOnBoard()



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
                        value: OnBoardData?.find((onBoard)=>onBoard.user=== user._id)?.jobTitle
                    },
                    {
                        align: 'center',
                        value: checkUserPermission('userDetail') && <Tooltip title={`View Full User Information`}>
                            <NavLink
                                to={`/users/${user._id}`}><PreviewIcon /></NavLink>
                        </Tooltip>
                    }

                ],

            })
        })
    }


    return (
        <Box sx={{ padding: '24px' }}>
            <DataTable DataTableData={{ ...dataTableData, bodyRow }} />
        </Box>
    );
};

export default UserDataTable;
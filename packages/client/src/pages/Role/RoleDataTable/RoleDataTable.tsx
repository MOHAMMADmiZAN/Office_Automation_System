import React from 'react';
import DataTable, { DataTableData } from "../../../components/organisms/DataTable/DataTable";
import { useRole } from "../../../hooks/useRole";
import Btn from "../../../components/molecules/Form/Btn";
import { Box } from "@mui/material";
import EditRoleModal from '../EditRoleModal/EditRoleModal';
import { Visibility, Delete, Edit, InsertInvitation } from "@mui/icons-material";
import CustomModal from '../../../components/organisms/CustomModal/CustomModal';

interface ROLE_DATA_TABLE_PROPS {
}

const dataTableData: DataTableData = {
    label: 'Role Data Table',
    headerRow: {
        tableCell: [
            {
                align: 'center',
                value: 'Name'
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

const RoleDataTable: React.FC<ROLE_DATA_TABLE_PROPS> = (props): JSX.Element => {
    const { Roles } = useRole()


    const bodyRow: DataTableData["bodyRow"] = [];

    if (Roles) {
        Roles.map((role) => {
            bodyRow.push({
                tableCell: [
                    {
                        align: 'center',
                        value: role.name
                    },
                    {
                        align: 'center',
                        value: <Box display={`flex`}>
                            <CustomModal modalId={'edit-role'}
                                modalContent={<EditRoleModal roleData={role} />}
                                ModalBtnIcon={<Edit />} />
                        </Box>
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

export default RoleDataTable;
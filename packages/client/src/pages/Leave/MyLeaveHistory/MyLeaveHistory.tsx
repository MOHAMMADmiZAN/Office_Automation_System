import React, {useCallback, useMemo} from 'react';
import useLeave from "../../../hooks/useLeave";
import useUsers from "../../../hooks/useUsers";
import useAuth from "../../../hooks/useAuth";
import {ILeavePayload} from "../../../api/Leave.api";
import moment from "moment";
import DataTable, {DataTableData} from "../../../components/organisms/DataTable/DataTable";

interface MY_LEAVE_HISTORY_PROPS {

}

const MyLeaveHistory: React.FC<MY_LEAVE_HISTORY_PROPS> = (props): JSX.Element => {
    const {leaves} = useLeave();
    const {usersWithSuperAdmin} = useUsers();
    const {userId} = useAuth();


    const MyLeaveHistory = useMemo(
        () => leaves?.filter((leave) => leave.user === userId), [leaves]
    )
    const createRow = useCallback(
        (leave: ILeavePayload) => {
            const user = usersWithSuperAdmin?.find((user) => user._id === leave.user);
            const responseUser = usersWithSuperAdmin?.find((user) => user._id === leave.requestToResponse);

            return {
                tableCell: [
                    {align: 'center', value: leave.leaveType},
                    {align: 'center', value: moment(leave.leaveStartDate).calendar()},
                    {align: 'center', value: moment(leave.leaveEndDate).calendar()},
                    {align: 'center', value: leave.leaveStatus},
                    {align: 'center', value: `${user?.firstName} ${user?.lastName}`},
                    {align: 'center', value: `${responseUser?.firstName} ${responseUser?.lastName}`},
                ]

            };
        },
        [usersWithSuperAdmin]
    );

    const bodyRow = useMemo(() => MyLeaveHistory?.map(createRow), [MyLeaveHistory, createRow]);
    const dataTableData: DataTableData = useMemo(
        () => ({
            label: 'Leave Request Data Table',
            headerRow: {
                tableCell: [
                    {align: 'center', value: 'Leave Type'},
                    {align: 'center', value: 'Start Date'},
                    {align: 'center', value: 'End Date'},
                    {align: 'center', value: 'Status'},
                    {align: 'center', value: 'Requested By'},
                    {align: 'center', value: 'Response By'},
                ],
            },
            bodyRow: bodyRow || [],
            DataTablePagination: {rowsPerPage: [5, 10, 25]},
        }),
        [bodyRow]
    );

    return <DataTable DataTableData={dataTableData}/>;
};

export default MyLeaveHistory;
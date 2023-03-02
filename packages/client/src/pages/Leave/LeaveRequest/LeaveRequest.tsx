import React, {useCallback, useMemo} from 'react';
import DataTable from "../../../components/organisms/DataTable";
import useLeave from "../../../hooks/useLeave";
import useUsers from "../../../hooks/useUsers";
import useAuth from "../../../hooks/useAuth";
import {DataTableData} from "../../../components/organisms/DataTable/DataTable";
import moment from "moment";
import {ILeavePayload} from "../../../api/Leave.api";
import {Box} from "@mui/material";
import CustomModal from "../../../components/organisms/CustomModal/CustomModal";
import LeaveRequestResponse from "../LeaveRequestResponse/LeaveRequestResponse";

interface LEAVE_REQUEST_PROPS {
}

const LeaveRequest: React.FC<LEAVE_REQUEST_PROPS> = (props): JSX.Element => {
    const {leaves} = useLeave();
    const {userId} = useAuth();
    const {usersWithSuperAdmin} = useUsers();


    const leaveRequest = useMemo(
        () =>
            leaves?.filter(
                (leave) => leave.leaveStatus === 'Pending' && leave.requestToResponse === userId
            ),
        [leaves, userId]
    );

    const createRow = useCallback(
        (leave: ILeavePayload) => {
            const user = usersWithSuperAdmin?.find((user) => user._id === leave.user);
            return {
                tableCell: [
                    {align: 'center', value: leave.leaveType},
                    {align: 'center', value: moment(leave.leaveStartDate).calendar()},
                    {align: 'center', value: moment(leave.leaveEndDate).calendar()},
                    {align: 'center', value: leave.leaveStatus},
                    {align: 'center', value: `${user?.firstName} ${user?.lastName}`},
                    {align: 'center',
                        value: <Box><CustomModal modalId={'Leave Request Response'}
                                                 modalContent={<LeaveRequestResponse data={leave}/>}
                                                 modalBtnText={`Click To Response`} modalBtnVariant={`contained`}
                                                 modalTitle={`Leave Request Response`}/></Box>
                    },
                ],
            };
        },
        [usersWithSuperAdmin]
    );

    const bodyRow = useMemo(() => leaveRequest?.map(createRow), [leaveRequest, createRow]);

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
                    {align: 'center', value: 'Actions'},
                ],
            },
            bodyRow: bodyRow || [],
            DataTablePagination: {rowsPerPage: [5, 10, 25]},
        }),
        [bodyRow]
    );

    return <DataTable DataTableData={dataTableData}/>;
};

export default LeaveRequest;

import React from 'react';
import CustomModal from "../../components/organisms/CustomModal/CustomModal";
import AddLeave from "./AddLeave/AddLeave";
import SendIcon from '@mui/icons-material/Send';
import CustomTabs, {TabItem} from "../../components/organisms/CustomTabs/CustomTabs";
import CommonCard from "../../components/molecules/CommonCard/CommonCard";
import LeaveRequest from "./LeaveRequest/LeaveRequest";
import LeaveHistory from "./LeaveHistory/LeaveHistory";
import MyLeaveHistory from "./MyLeaveHistory/MyLeaveHistory";


interface LEAVE_PROPS {

}

const tabItems: TabItem[] = [
    {
        label: "Leave Request",
        component: <LeaveRequest/>
    },
    {
        label: "My Leave History",
        component: <MyLeaveHistory/>
    },
    {
        label: "Leave History",
        component: <LeaveHistory/>
    }
]


const Leave: React.FC<LEAVE_PROPS> = (props): JSX.Element => {
    return (
        <>
            <CustomModal modalId={'leave-request'} modalContent={<AddLeave/>} modalTitle={`Leave Request`}
                         modalBtnVariant={`outlined`} ModalBtnIcon={<SendIcon/>} modalBtnText={`Send Leave Request`}/>
            <CommonCard CardMain={<CustomTabs tabs={tabItems}/>}/>
        </>
    );
};

export default Leave;
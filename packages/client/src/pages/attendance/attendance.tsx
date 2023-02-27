import React from 'react';
import CommonCard from "../../components/molecules/CommonCard/CommonCard";
import CustomTabs, {TabItem} from "../../components/organisms/CustomTabs/CustomTabs";
import TodayAttendance from "./TodayAttendance/TodayAttendance";
import AttendanceHistory from "./AttendanceHistory/AttendanceHistory";
import AttendanceSheet from "./AttendanceSheet/AttendanceSheet";

interface ATTENDANCE_PROPS {

}

const tabItems: TabItem[] = [
    {
        label: "Today Attendance Sheet",
        component: <TodayAttendance/>
    },
    {
        label: "My Attendance History Sheet",
        component: <AttendanceHistory/>
    },
    {
        label: "Attendance Sheet",
        component: <AttendanceSheet/>
    }

]

const Attendance: React.FC<ATTENDANCE_PROPS> = (props): JSX.Element => {
    return (
        <>

            <CommonCard CardMain={<CustomTabs tabs={tabItems}/>}/>

        </>
    );
};

export default Attendance;
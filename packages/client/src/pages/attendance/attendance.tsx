import React from 'react';
import CommonCard from "../../components/molecules/CommonCard/CommonCard";
import CustomTabs, {TabItem} from "../../components/organisms/CustomTabs/CustomTabs";
import UpcomingEvent from "../event/UpComingEvent/UpcomingEvent";
import EventHistory from "../event/EventHistory/EventHistory";
import EventRequest from "../event/EventRequest/EventRequest";
import TodayAttendance from "./TodayAttendance/TodayAttendance";

interface ATTENDANCE_PROPS {

}

const tabItems: TabItem[] = [
    {
        label: "Today Attendance Sheet",
        component: <TodayAttendance/>
    },
    {
        label: "My Attendance History",
        component: <UpcomingEvent/>
    },
    {
        label: "Leave Request",
        component: <EventHistory/>
    },
    {
        label: "Leave History",
        component: <EventRequest/>
    },

]

const Attendance: React.FC<ATTENDANCE_PROPS> = (props): JSX.Element => {
    return (
        <>

            <CommonCard CardMain={<CustomTabs tabs={tabItems}/>}/>

        </>
    );
};

export default Attendance;
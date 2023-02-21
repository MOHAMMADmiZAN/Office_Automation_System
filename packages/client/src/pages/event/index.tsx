import React from 'react';
import CustomTabs, {TabItem} from "../../components/organisms/CustomTabs/CustomTabs";
import CommonCard from "../../components/molecules/CommonCard/CommonCard";
import TodayEvent from "./TodayEvent/TodayEvent";
import UpcomingEvent from "./UpComingEvent/UpcomingEvent";
import EventHistory from "./EventHistory/EventHistory";
import EventRequest from "./EventRequest/EventRequest";
import AddEventModal from "./AddEventModal/AddEventModal";
import {useRole} from '../../hooks/useRole';


interface EVENT_PROPS {
}


const Event: React.FC<EVENT_PROPS> = () => {
    const { checkUserPermission } = useRole()

    const tabItems: TabItem[] = [
        {
            label: "Event in Today",
            component: <TodayEvent />
        },
        {
            label: "Upcoming Event",
            component: <UpcomingEvent />
        },
        {
            label: "Event History",
            component: <EventHistory />
        },
        {
            label: "Event Request",
            component: <EventRequest />
        },

    ]

    return (
        <>
            {checkUserPermission('manageEvent') && <AddEventModal />}
            <CommonCard CardMain={<CustomTabs tabs={tabItems} ariaLabel={'event-tab'} />} />
        </>
    );
};

export default Event;
import React from 'react';
import CustomTabs, {TabItem} from "../../molecules/CustomTabs/CustomTabs";

interface EVENT_PROPS {

}
const tabItems: TabItem[] = [
    {
        label: "Event In Today",
        component: <div>Event in today</div>
    },
    {
        label: "Event In This Week",
        component: <div>Event in Week</div>
    },
    {
        label: "Event In This Month",
        component: <div>Event in Month</div>
    },
    {
        label: "Upcoming Event",
        component: <div>Upcoming Event</div>
    }
]

const Event: React.FC<EVENT_PROPS> = () => {
    return (
        <>
            <CustomTabs tabs={tabItems} ariaLabel={'event-tab'}/>
        </>
    );
};

export default Event;
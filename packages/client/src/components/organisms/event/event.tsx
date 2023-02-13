import React from 'react';
import CustomTabs, {TabItem} from "../../molecules/CustomTabs/CustomTabs";

interface EVENT_PROPS {

}
const tabItems: TabItem[] = [
    {
        label: "Tab 1",
        component: <div>Tab 1</div>
    },
    {
        label: "Tab 2",
        component: <div>Tab 2</div>
    },
    {
        label: "Tab 3",
        component: <div>Tab 4</div>
    },
    {
        label: "Tab 4",
        component: <div>Tab 3</div>
    }
]

const Event: React.FC<EVENT_PROPS> = (props) => {
    return (
        <>
           <CustomTabs tabs={tabItems} ariaLabel={'event-tab'}/>

        </>
    );
};

export default Event;
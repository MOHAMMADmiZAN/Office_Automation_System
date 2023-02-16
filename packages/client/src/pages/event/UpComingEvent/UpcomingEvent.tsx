import React from 'react';
import EventLayout, {EVENT_LAYOUT_PROPS} from "../EventLayout/EventLayout";
import moment from "moment";

interface UPCOMING_EVENT_PROPS {

}

const UpcomingEvent: React.FC<UPCOMING_EVENT_PROPS> = (): JSX.Element => {

    const handleRowFunc = (date: Date) => {
        return moment(date).isAfter(moment());
    }
    return (
        <>
            <EventLayout  isBodyRowFuncDate={handleRowFunc} label={`event-list`}/>

        </>
    );
};

export default UpcomingEvent;
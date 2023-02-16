import React from 'react';
import EventLayout from "../EventLayout/EventLayout";
import moment from "moment";

interface EVENT_HISTORY_PROPS {

}

const EventHistory: React.FC<EVENT_HISTORY_PROPS> = (props): JSX.Element => {
    const handleRowFunc = (date:Date) => {
        return moment(date).isBefore(moment());
    };
    return (
        <>
            <EventLayout  isBodyRowFuncDate={handleRowFunc} label={`event-list`}/>


        </>
    );
};

export default EventHistory;
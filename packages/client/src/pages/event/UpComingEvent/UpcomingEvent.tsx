import React from 'react';
import EventLayout, {EVENT_LAYOUT_PROPS} from "../EventLayout/EventLayout";
import moment from "moment";
import {IEventPayloadWithId} from "../../../api/Event.api";

interface UPCOMING_EVENT_PROPS {

}

const UpcomingEvent: React.FC<UPCOMING_EVENT_PROPS> = (): JSX.Element => {

    const handleRowFunc = (item:IEventPayloadWithId) => {

        return moment(item.startTime).isAfter(moment()) || item.status === 'UPCOMING'


    }
    return (
        <>
            <EventLayout  isBodyRowFunc={handleRowFunc} label={`event-list`}/>

        </>
    );
};

export default UpcomingEvent;
import React from 'react';
import EventLayout from "../EventLayout/EventLayout";
import moment from "moment";
import {IEventPayloadWithId} from "../../../api/Event.api";

interface EVENT_HISTORY_PROPS {

}

const EventHistory: React.FC<EVENT_HISTORY_PROPS> = (props): JSX.Element => {

    const handleRowFunc = (item: IEventPayloadWithId) => {
        return moment(item.endTime).isBefore(moment()) || item.status === 'FINISHED'

    }
    return (
        <>
            <EventLayout isBodyRowFunc={handleRowFunc} label={`event-list`}/>
        </>
    );
};

export default EventHistory;
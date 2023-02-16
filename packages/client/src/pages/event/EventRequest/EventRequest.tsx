import React from 'react';
import EventLayout from "../EventLayout/EventLayout";
import useAuth from "../../../hooks/useAuth";
import {IEventPayloadWithId} from "../../../api/Event.api";
import {inviteUser} from "../../../components/organisms/CustomModal/InviteUsersModal/InviteUsersModal";

interface EVENT_REQUEST_PROPS {


}

const EventRequest: React.FC<EVENT_REQUEST_PROPS> = (props): JSX.Element => {
    const {userId} = useAuth();


    const handleRowFunc = (item: IEventPayloadWithId) => {

        return item.invitation.find((i: inviteUser) => i.userId === userId);


    }
    return (
        <>

            <EventLayout  isBodyRowFunc={handleRowFunc} label={`event-list`}/>

        </>
    );
};

export default EventRequest;
import React from 'react';
import CustomTabs, {TabItem} from "../../components/organisms/CustomTabs/CustomTabs";

import CommonCard from "../../components/molecules/CommonCard/CommonCard";
import useAuth from "../../hooks/useAuth";
import {EventApi, IEventPayload, IEventPayloadWithId} from "../../api/Event.api";
import {FORM_INPUT_PROPS, FormInputType, selectOption} from "../../components/molecules/Form/FormInput/Form_Input";
import CustomModal from "../../components/organisms/CustomModal/CustomModal";
import FormLayOut from "../../components/organisms/Form/FormLayOut/FormLayOut";
import {eventValidation} from "../../utils/Validation";
import {Add} from "@mui/icons-material";
import {SubmitHandler} from "react-hook-form";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {User} from "../../store/models/AuthModel";
import {UserApi} from "../../api/User.api";
import TodayEvent from "./TodayEvent/TodayEvent";
import UpcomingEvent from "./UpComingEvent/UpcomingEvent";
import EventHistory from "./EventHistory/EventHistory";
import EventRequest from "./EventRequest/EventRequest";



interface EVENT_PROPS {

}



const defaultValues = {
    author: '',
    title: '',
    description: '',
    startTime: new Date(),
    endTime: new Date(),
    status: '',
    type: '',


}

export interface eventFormInputField {
    name: string;
    type: FormInputType;
    placeholder: string;
    smallField: boolean;
    label: string;
    id?: string;
    selectOptions?: selectOption[];

}

export const eventFormFields: eventFormInputField[] = [
    {
        name: `title`,
        type: `text`,
        placeholder: `Type Your Event Title`,
        smallField: false,
        label: `Event Title`,
    },
    {
        name: `description`,
        type: `textarea`,
        placeholder: `Type Your Event Description`,
        smallField: false,
        label: `Event Description`,
    },
    {
        name: `startTime`,
        type: `datetime-local`,
        placeholder: `Type Your Event Start Time`,
        smallField: true,
        label: `Event Start Time`,
        id: `startTime`

    }, {
        name: `endTime`,
        type: `datetime-local`,
        placeholder: `Type Your Event End Time`,
        smallField: true,
        label: `Event End Time`,
        id: `endTime`

    },
    {
        name: `type`,
        type: `select`,
        placeholder: `Select Event Type`,
        smallField: true,
        label: `Event Type`,
        selectOptions: [{
            value: `MEETING`,
            label: `MEETING`
        }, {
                value: `BIRTHDAY`,
                label: `BIRTHDAY`
            },
            {
                value: `FAREWELL`,
                label: `FAREWELL`
            },
            {
                value: `OTHER`,
                label: `OTHER`
            }


        ]
    }

]

const Event: React.FC<EVENT_PROPS> = () => {
    const {userId} = useAuth();
    const {mutate, isLoading, error} = useMutation(EventApi.eventCreate, {
        onSuccess: async (data) => {
            console.log(data);
            await queryClient.invalidateQueries('allEvents');

        }
    })
    const queryClient = useQueryClient();


    const onSubmit: SubmitHandler<IEventPayload> = async (data) => {

        // console.log(data);
        await mutate(data);


    }
    const tabItems: TabItem[] = [
        {
            label: "Event in Today",
            component: <TodayEvent/>

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
            <CustomModal modalId={`add-event`} modalContent={
                <FormLayOut FormInputFields={eventFormFields as FORM_INPUT_PROPS[]}
                            defaultValues={{...defaultValues, author: userId}}
                            btnText={`Add Event`}
                            onSubmit={onSubmit} validationRules={eventValidation}/>
            }
                         ModalBtnIcon={<Add/>}
                         modalTitle={`Add Event`}
                         modalBtnText={`Add Event`}
                         modalBtnVariant={`outlined`}
            />
            <CommonCard CardMain={<CustomTabs tabs={tabItems} ariaLabel={'event-tab'}/>}/>
        </>
    );
};

export default Event;
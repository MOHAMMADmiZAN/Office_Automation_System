import React from 'react';
import {useMutation, useQuery, useQueryClient} from "react-query";
import {EventApi, IEventPayload, IEventPayloadWithId} from "../../../api/Event.api";
import DataTable from "../../../components/organisms/DataTable";
import {DataTableData} from "../../../components/organisms/DataTable/DataTable";
import moment from "moment";
import {Delete, Edit, InsertInvitation} from "@mui/icons-material";
import Btn from "../../../components/molecules/Form/Btn";
import {Box, Typography} from "@mui/material";
import {UserApi} from "../../../api/User.api";
import {User} from "../../../store/models/AuthModel";
import CustomModal from "../../../components/organisms/CustomModal/CustomModal";
import FormLayOut from "../../../components/organisms/Form/FormLayOut/FormLayOut";
import {eventFormFields} from "../index";
import {FORM_INPUT_PROPS, selectOption} from "../../../components/molecules/Form/FormInput/Form_Input";
import {eventValidation} from "../../../utils/Validation";
import {SubmitHandler} from 'react-hook-form';
import useAuth from "../../../hooks/useAuth";
import EventLayout, {EVENT_LAYOUT_PROPS} from "../EventLayout/EventLayout";
import EditEventModal from "../../../components/organisms/CustomModal/EditEventModal/EditEventModal";
import InviteUsersModal from "../../../components/organisms/CustomModal/InviteUsersModal/InviteUsersModal";

interface TODAY_EVENT_PROPS  {


}



const TodayEvent: React.FC<TODAY_EVENT_PROPS> = (): JSX.Element => {




    const handleRowFunc = (item:Date)=>{
      return   moment(item).isSame(moment(), "day");
    }



    return (
        <EventLayout isBodyRowFuncDate={handleRowFunc} label={`Event-List`}/>


    );

};

export default TodayEvent;
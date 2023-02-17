import React from 'react';
import moment from "moment";
import EventLayout from "../EventLayout/EventLayout";

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
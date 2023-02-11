import React from 'react';
import {CommonCardContent, CommonCardHeader, CommonCardLayout} from "./styles/CommonCard.style";
import {Divider} from "@mui/material";

interface COMMON_CARD_PROPS {
    cardTitle?: string;
    CardMain?: React.ReactNode;

}

const CommonCard: React.FC<COMMON_CARD_PROPS> = ({cardTitle,CardMain}) => {
    return (
        <>
       <CommonCardLayout>
           <CommonCardHeader title={cardTitle}/>
           <Divider/>
           <CommonCardContent>
                {CardMain}
           </CommonCardContent>

       </CommonCardLayout>


        </>
    );
};

export default CommonCard;
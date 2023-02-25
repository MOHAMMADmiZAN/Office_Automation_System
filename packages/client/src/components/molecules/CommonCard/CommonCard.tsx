import React, {memo} from 'react';
import {CommonCardContent, CommonCardHeader, CommonCardLayout} from "./styles/CommonCard.style";
import {Divider} from "@mui/material";

interface COMMON_CARD_PROPS {
    cardTitle?: string;
    CardMain?: React.ReactNode;
    children?: React.ReactNode;

}

const CommonCard: React.FC<COMMON_CARD_PROPS> = ({cardTitle, CardMain, children}) => {
    return (
        <>
            <CommonCardLayout>
                {cardTitle && (
                    <>
                        <CommonCardHeader title={cardTitle}/>
                        <Divider/>
                    </>
                )}
                <CommonCardContent>
                    {CardMain}
                    {children}
                </CommonCardContent>

            </CommonCardLayout>


        </>
    );
};

export default memo(CommonCard);
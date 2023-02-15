import React, {memo} from 'react';
import {CustomBtn} from "./styles/Btn.style";

export type BtnType = 'button' | 'submit' | 'reset'
export type BtnVariant = 'text' | 'outlined' | 'contained'
export type BtnSize = 'small' | 'medium' | 'large'

export interface BTN_PROPS {
    type?: BtnType;
    BtnText?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

    disabled?: boolean;
    className?: string;
    variant?: BtnVariant;
    size?: BtnSize
    btnRef?: React.Ref<HTMLButtonElement>;
    isRounded?: boolean;
    BtnStartIcon?: React.ReactNode;
    BtnEndIcon?: React.ReactNode;
    styles?: React.CSSProperties;


}

export const Btn: React.FC<BTN_PROPS> = ({
                                             type,
                                             BtnText,
                                             onClick,
                                             disabled,
                                             className,
                                             variant,
                                             size,
                                             isRounded,
                                             btnRef,
                                             BtnStartIcon,
                                             BtnEndIcon,
                                             styles


                                         }): JSX.Element => {
    return (
        <CustomBtn type={type} onClick={onClick} variant={variant} disabled={disabled} className={className}
                   size={size} ref={btnRef} startIcon={BtnStartIcon} endIcon={BtnEndIcon} sx={{...styles}}>{BtnText}</CustomBtn>
    );
};

export default memo(Btn)
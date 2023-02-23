import {CSSProperties} from "react";

export const userAvatarStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    objectPosition: 'center',
    border: '1px solid #e0e0e0',
    boxShadow: '0 0 0 1px #e0e0e0',
    margin: '0 auto',
    display: 'block',
    marginBottom: '10px',
    overflow: 'hidden',
    '& img': {
        width: '100%',
        height: '100%',
    }

} as CSSProperties


export const headerTypography = {
    margin: '10px 0 10px 0',
    color: '#20846A',
    '&:after': {
        content: '""',
        display: 'block',
        width: '75px',
        height: '2px',
        backgroundColor: '#20846A',
        marginTop: '10px',

    }

}
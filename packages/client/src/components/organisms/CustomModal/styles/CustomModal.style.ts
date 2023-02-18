import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    iconBtn: {
        width: '0% !important',

    },
    modalBody: {
        width: '100%',
        height: '100vh',
        zIndex: 8888,
        position: 'fixed',
        top: 0,
        left: 0,
        background: '#161618',
        overflow: 'auto',

    },
    textBtn: {
       padding: '10px 20px',
    }
}));




export default useStyles;
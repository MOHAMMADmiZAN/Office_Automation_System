import moment from 'moment';


export const dateTimeFormat = (dateTime: string | undefined) => {
    if (!dateTime) return '';
    return moment(dateTime).toISOString()
}
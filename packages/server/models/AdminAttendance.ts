export interface IAdminAttendance {
    status: string;
    timeLimit: number;

}

const {model, Schema} = require('mongoose')

const AdminAttendanceSchema = new Schema({
    status: {
        type: String,
        enum: ['RUNNING', 'COMPLETED'],
        default: 'RUNNING'
    },
    timeLimit: {
        type: Number,
        min: 1,
        max: 20,
        default: 5

    }

}, {timestamps: true})
const AdminAttendance = model('AdminAttendance', AdminAttendanceSchema)
export default AdminAttendance
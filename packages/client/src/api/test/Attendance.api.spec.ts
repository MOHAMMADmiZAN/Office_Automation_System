import {beforeEach, describe, expect, it, vi} from 'vitest'
import AttendanceApi, {IAttendancePayload} from "../Attendance.api";


vi.mock('axios', () => {
    return {
        default: {
            create: vi.fn(() => ({
                interceptors: {
                    request: {use: vi.fn(), eject: vi.fn()},
                    response: {use: vi.fn(), eject: vi.fn()},
                },
                post: vi.fn(() => ({})),
            })),
        },
    }
})

describe('AttendanceApi', () => {
    let attendanceCreateSpy = vi.spyOn(AttendanceApi, 'attendanceCreate')
    let attendanceBYIdSpy = vi.spyOn(AttendanceApi, 'attendanceBYId')
    let attendanceFindAllSpy = vi.spyOn(AttendanceApi, 'attendanceFindAll')
    let attendanceUpdateSpy = vi.spyOn(AttendanceApi, 'attendanceUpdate')
    let attendanceDeleteSpy = vi.spyOn(AttendanceApi, 'attendanceDelete')
    beforeEach(() => {
        attendanceCreateSpy.mockReset()
        attendanceBYIdSpy.mockReset()
        attendanceFindAllSpy.mockReset()
        attendanceUpdateSpy.mockReset()
        attendanceDeleteSpy.mockReset()
    })
    let AttendancePayloadData: IAttendancePayload = {
        _id: "id",
        user: "user",
        adminAttendance: "adminAttendance",
        checkIn: new Date(),
        checkOut: new Date(),
        status: "status",
        comment: "comment"


    }

    describe('attendanceCreate', () => {
        it('SuccessFullyCreate', async function () {
            let res = attendanceCreateSpy.mockResolvedValue(AttendancePayloadData)
            let AttendancePayloadDataResponse = await AttendanceApi.attendanceCreate(AttendancePayloadData)
            expect(res.getMockName()).toEqual('attendanceCreate')
            expect(res).toBeCalledTimes(1)
            expect(res).toBeCalledWith(AttendancePayloadData)
            expect(AttendancePayloadDataResponse).toStrictEqual(AttendancePayloadData)
        })
        it('failed to fetch admin attendance find all', async function () {
            const expectedError = new Error('Invalid Data')
            let res = attendanceCreateSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(AttendanceApi.attendanceCreate).rejects.toThrow(expectedError)
        });


    });
    describe('attendanceBYId', () => {
        it('SuccessFullyFetch', async function () {
            let res = attendanceBYIdSpy.mockResolvedValue(AttendancePayloadData)
            let AttendancePayloadDataResponse = await AttendanceApi.attendanceBYId("id")
            expect(res.getMockName()).toEqual('attendanceBYId')
            expect(res).toBeCalledTimes(1)
            expect(res).toBeCalledWith("id")
            expect(AttendancePayloadDataResponse).toStrictEqual(AttendancePayloadData)
        })
        it('failed to fetch admin attendance find all', async function () {
            const expectedError = new Error('Invalid Data')
            let res = attendanceBYIdSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(AttendanceApi.attendanceBYId).rejects.toThrow(expectedError)
        });


    });
    describe('attendanceFindAll', () => {
        it('SuccessFullyFetch', async function () {
            let res = attendanceFindAllSpy.mockResolvedValue([AttendancePayloadData])
            let AttendancePayloadDataResponse = await AttendanceApi.attendanceFindAll()
            expect(res.getMockName()).toEqual('attendanceFindAll')
            expect(res).toBeCalledTimes(1)
            expect(res).toBeCalledWith()
            expect(AttendancePayloadDataResponse).toStrictEqual([AttendancePayloadData])
        })
        it('failed to fetch admin attendance find all', async function () {
            const expectedError = new Error('Invalid Data')
            let res = attendanceFindAllSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(AttendanceApi.attendanceFindAll).rejects.toThrow(expectedError)
        });


    });
    describe('attendanceUpdate', () => {
        it('SuccessFullyUpdate', async function () {
            let res = attendanceUpdateSpy.mockResolvedValue(AttendancePayloadData)
            let AttendancePayloadDataResponse = await AttendanceApi.attendanceUpdate(AttendancePayloadData, "id")
            expect(res.getMockName()).toEqual('attendanceUpdate')
            expect(res).toBeCalledTimes(1)
            expect(res).toBeCalledWith(AttendancePayloadData, 'id')
            expect(AttendancePayloadDataResponse).toStrictEqual(AttendancePayloadData)
        })
        it('failed to fetch admin attendance find all', async function () {
            const expectedError = new Error('Invalid Data')
            let res = attendanceUpdateSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(AttendanceApi.attendanceUpdate(AttendancePayloadData, 'id')).rejects.toThrow(expectedError)
        });


    });
    describe('attendanceDelete', () => {
        it('SuccessFullyDelete', async function () {
            let res = attendanceDeleteSpy.mockResolvedValue(AttendancePayloadData)
            let AttendancePayloadDataResponse = await AttendanceApi.attendanceDelete("id")
            expect(res.getMockName()).toEqual('attendanceDelete')
            expect(res).toBeCalledTimes(1)
            expect(res).toBeCalledWith("id")
            expect(AttendancePayloadDataResponse).toStrictEqual(AttendancePayloadData)
        })
        it('failed to fetch admin attendance find all', async function () {
            const expectedError = new Error('Invalid Data')
            let res = attendanceDeleteSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(AttendanceApi.attendanceDelete('id')).rejects.toThrow(expectedError)
        });
    });
})

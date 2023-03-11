import {describe, expect, vi} from 'vitest'
import LeaveApi, {ILeavePayload} from "../Leave.api";


vi.mock('axios', () => {
    return {
        default: {
            create: vi.fn(() => ({
                interceptors: {
                    request: {use: vi.fn(), eject: vi.fn()},
                    response: {use: vi.fn(), eject: vi.fn()},
                },
                post: vi.fn(() => ({})),
                put: vi.fn(() => ({})),
                get: vi.fn(() => ({})),
                delete: vi.fn(() => ({})),
            })),
        },
    }
})

describe('LeaveApi', () => {
    let leaveListSpy = vi.spyOn(LeaveApi, 'leaveList')
    let createLeaveSpy = vi.spyOn(LeaveApi, 'leaveCreate')
    let updateLeaveSpy = vi.spyOn(LeaveApi, 'leaveUpdate')
    let deleteLeaveSpy = vi.spyOn(LeaveApi, 'leaveDelete')


    beforeEach(() => {
        leaveListSpy.mockReset()
        createLeaveSpy.mockReset()
        updateLeaveSpy.mockReset()
        deleteLeaveSpy.mockReset()

    })

    let leaveData :ILeavePayload = {
        _id: 'id',
        user: "user",
        leaveType: "leaveType",
        leaveReason: "leaveReason",
        leaveStartDate: "leaveStartDate",
        leaveEndDate: "leaveEndDate",
        leaveStatus: "leaveStatus",
        leaveComment: "leaveComment",
        leaveAttachment: "leaveAttachment",
        requestToResponse: "requestToResponse",
        requestToResponseComment: "requestToResponseComment",
    }
    describe('leaveList', () => {
        it('SuccessFullyGetLeaveList', async function () {

            let res = leaveListSpy.mockResolvedValue([{...leaveData}])
            let leaveListResponseData = await LeaveApi.leaveList()
            expect(res.getMockName()).toEqual('leaveList')
            expect(res).toBeCalledTimes(1)
            expect(leaveListResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it(' failed Leave list', function () {
            let expectedError = new Error('Invalid Data')
            let res = leaveListSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            expect(LeaveApi.leaveList()).rejects.toThrow(expectedError)

        });
    })
    describe('leaveCreate', () => {
        it('SuccessFullyCreateLeave', async function () {
            let res = createLeaveSpy.mockResolvedValue({...leaveData})
            let leaveCreateResponseData = await LeaveApi.leaveCreate(leaveData)
            expect(res.getMockName()).toEqual('leaveCreate')
            expect(res).toBeCalledTimes(1)
            expect(leaveCreateResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to create Leave', function () {
            let expectedError = new Error('Invalid Data')
            let res = createLeaveSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            expect(LeaveApi.leaveCreate(leaveData)).rejects.toThrow(expectedError)
        });
    })
    describe('leaveUpdate', () => {
        it('SuccessFullyUpdateLeave', async function () {
            let res = updateLeaveSpy.mockResolvedValue({...leaveData})
            let leaveUpdateResponseData = await LeaveApi.leaveUpdate(leaveData, 'id')
            expect(res.getMockName()).toEqual('leaveUpdate')
            expect(res).toBeCalledTimes(1)
            expect(leaveUpdateResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to update Leave', function () {
            let expectedError = new Error('Invalid Data')
            let res = updateLeaveSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            expect(LeaveApi.leaveUpdate(leaveData,'id')).rejects.toThrow(expectedError)
        });
    })
    describe('leaveDelete', () => {
        it('SuccessFullyDeleteLeave', async function () {
            let res = deleteLeaveSpy.mockResolvedValue({...leaveData})
            let leaveDeleteResponseData = await LeaveApi.leaveDelete('id')
            expect(res.getMockName()).toEqual('leaveDelete')
            expect(res).toBeCalledTimes(1)
            expect(leaveDeleteResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to delete Leave', function () {
            let expectedError = new Error('Invalid Data')
            let res = deleteLeaveSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            expect(LeaveApi.leaveDelete('id')).rejects.toThrow(expectedError)
        });
    })



})
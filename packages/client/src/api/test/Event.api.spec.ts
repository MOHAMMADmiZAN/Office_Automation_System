import {beforeEach, describe, expect, it, vi} from 'vitest'
import {EventApi} from "../Event.api";


vi.mock('axios', () => {
    return {
        default: {
            create: vi.fn(() => ({
                interceptors: {
                    request: {use: vi.fn(), eject: vi.fn()},
                    response: {use: vi.fn(), eject: vi.fn()},
                },
                post: vi.fn(),
                put: vi.fn(),
                get: vi.fn(),
                delete: vi.fn(),
            })),
        },
    }
})

describe('EventApi', () => {
    let eventListSpy = vi.spyOn(EventApi, 'eventList')
    let eventDetailsSpy = vi.spyOn(EventApi, 'eventDetail')
    let createEventSpy = vi.spyOn(EventApi, 'eventCreate')
    let updateEventSpy = vi.spyOn(EventApi, 'eventUpdate')
    let deleteEventSpy = vi.spyOn(EventApi, 'eventDelete')
    let changeInviteStatusSpy = vi.spyOn(EventApi, 'changeInviteStatus')


    beforeEach(() => {
        eventListSpy.mockReset()
        eventDetailsSpy.mockReset()
        createEventSpy.mockReset()
        updateEventSpy.mockReset()
        deleteEventSpy.mockReset()
        changeInviteStatusSpy.mockReset()
    })
    let eventData = {
        author: "author",
        title: "title",
        description: "description",
        startTime: new Date(),
        endTime: new Date(),
        invitation: "invite",
        status: "pending",
        type: "string",
        _id: "id",

    }


    describe('eventList', () => {
        it('SuccessFullyGetEventList', async function () {

            let res = eventListSpy.mockResolvedValue([{...eventData}])
            let eventListResponseData = await EventApi.eventList()
            expect(res.getMockName()).toEqual('eventList')
            expect(res).toBeCalledTimes(1)
            expect(eventListResponseData).toStrictEqual(res.mock.results[0].value)
        })


        it('failed get eventList', function () {
            const expectedError = new Error('Invalid Data')
            let res = eventListSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            expect(EventApi.eventList()).rejects.toThrow(expectedError)


        });

    })
    describe('eventDetail', () => {
        it('SuccessFullyGetEventDetail', async function () {
            let res = eventDetailsSpy.mockResolvedValue(eventData)
            let eventDetailResponseData = await EventApi.eventDetail('id')
            expect(res.getMockName()).toEqual('eventDetail')
            expect(res).toBeCalledTimes(1)
            expect(eventDetailResponseData).toStrictEqual(res.mock.results[0].value)
        })

        it('failed get eventDetail', function () {
            const expectedError = new Error('Invalid Data')
            let res = eventDetailsSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            expect(EventApi.eventDetail('id')).rejects.toThrow(expectedError)
        });
    })
    describe('eventCreate', () => {
        it('SuccessFullyCreateEvent', async function () {
            let res = createEventSpy.mockResolvedValue(eventData)
            let eventCreateResponseData = await EventApi.eventCreate(eventData)
            expect(res.getMockName()).toEqual('eventCreate')
            expect(res).toBeCalledTimes(1)
            expect(eventCreateResponseData).toStrictEqual(res.mock.results[0].value)
        })

        it('failed create event', function () {
            const expectedError = new Error('Invalid Data')
            let res = createEventSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            expect(EventApi.eventCreate(eventData)).rejects.toThrow(expectedError)
        });

    })
    describe('eventUpdate', () => {
        it('SuccessFullyUpdateEvent', async function () {
            let res = updateEventSpy.mockResolvedValue(eventData)
            let eventUpdateResponseData = await EventApi.eventUpdate(eventData, 'id')
            expect(res.getMockName()).toEqual('eventUpdate')
            expect(res).toBeCalledTimes(1)
            expect(eventUpdateResponseData).toStrictEqual(res.mock.results[0].value)
        })

        it('failed update event', function () {
            const expectedError = new Error('Invalid Data')
            let res = updateEventSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            expect(EventApi.eventUpdate(eventData, 'id')).rejects.toThrow(expectedError)
        });
    })
    describe('eventDelete', () => {
        it('SuccessFullyDeleteEvent', async function () {
            let res = deleteEventSpy.mockResolvedValue(eventData)
            let eventDeleteResponseData = await EventApi.eventDelete('id')
            expect(res.getMockName()).toEqual('eventDelete')
            expect(res).toBeCalledTimes(1)
            expect(eventDeleteResponseData).toStrictEqual(res.mock.results[0].value)
        })

        it('failed delete event', function () {
            const expectedError = new Error('Invalid Data')
            let res = deleteEventSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            expect(EventApi.eventDelete('id')).rejects.toThrow(expectedError)
        });

    })
    describe('changeInviteStatus', () => {
        it('SuccessFullyChangeInviteStatus', async function () {
            let res = changeInviteStatusSpy.mockResolvedValue({...eventData, userId: 'id', status: 'accept'})
            let changeInviteStatusResponseData = await EventApi.changeInviteStatus('id', {
                ...eventData,
                userId: 'id',
                status: 'accept'
            })
            expect(res.getMockName()).toEqual('changeInviteStatus')
            expect(res).toBeCalledTimes(1)
            expect(changeInviteStatusResponseData).toStrictEqual(res.mock.results[0].value)
        })

        it('failed change invite status', function () {
            const expectedError = new Error('Invalid Data')
            let res = changeInviteStatusSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            expect(EventApi.changeInviteStatus('id', {
                ...eventData,
                userId: 'id',
                status: 'accept'
            })).rejects.toThrow(expectedError)
        });

    })


})

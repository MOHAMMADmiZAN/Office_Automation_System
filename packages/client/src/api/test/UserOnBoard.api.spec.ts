import {beforeEach, describe, expect, it, vi} from 'vitest'
import {IUserOnBoardPayload, UserOnBoardApi} from "../UserOnBoard.api";


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

describe('UserOnBoardApi', () => {
    let userOnBoardListSpy = vi.spyOn(UserOnBoardApi, 'userOnBoardList')
    let userOnBoardCreateSpy = vi.spyOn(UserOnBoardApi, 'userOnBoardCreate')
    let userOnBoardUpdateSpy = vi.spyOn(UserOnBoardApi, 'userOnBoardUpdate')
    let userOnBoardDeleteSpy = vi.spyOn(UserOnBoardApi, 'userOnBoardDelete')
    let userOnBoardGetSpy = vi.spyOn(UserOnBoardApi, 'userOnBoardById')


    beforeEach(() => {
        userOnBoardListSpy.mockReset()
        userOnBoardCreateSpy.mockReset()
        userOnBoardUpdateSpy.mockReset()
        userOnBoardDeleteSpy.mockReset()
        userOnBoardGetSpy.mockReset()
    })

    const userOnBoardData: IUserOnBoardPayload = {
        user: 'test',
        joiningDate: '2021-01-01',
        jobTitle: 'test',
        salary: 1000,
        status: 'test',
        farewellDate: '2021-01-01',

    }
    describe('userOnBoardList', () => {

        it('Successfully userOnBoardList Fetch', async function () {
            let res = userOnBoardListSpy.mockResolvedValue([{...userOnBoardData, _id: 'id'}])
            expect(res.getMockName()).toEqual('userOnBoardList')
            let getAllUserOnBoardResponseData = await UserOnBoardApi.userOnBoardList()
            expect(getAllUserOnBoardResponseData).toStrictEqual(res.mock.results[0].value)
            expect(res).toBeCalledTimes(1)


        });
        it('failed to fetch userOnBoardList', async function () {
            const expectedError = new Error('Invalid Data')
            let res = userOnBoardListSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserOnBoardApi.userOnBoardList()).rejects.toThrow(expectedError)
        });
    })
    describe('userOnBoardCreate', () => {
        it('Successfully userOnBoardCreate', async function () {
            let res = userOnBoardCreateSpy.mockResolvedValue({...userOnBoardData})
            expect(res.getMockName()).toEqual('userOnBoardCreate')
            let createUserOnBoardResponseData = await UserOnBoardApi.userOnBoardCreate(userOnBoardData)
            expect(createUserOnBoardResponseData).toStrictEqual(res.mock.results[0].value)
            expect(res).toBeCalledTimes(1)
        });
        it('failed to create userOnBoardCreate', async function () {
            const expectedError = new Error('Invalid Data')
            let res = userOnBoardCreateSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserOnBoardApi.userOnBoardCreate(userOnBoardData)).rejects.toThrow(expectedError)
        });
    })
    describe('userOnBoardUpdate', () => {
        it('Successfully userOnBoardUpdate', async function () {
            let res = userOnBoardUpdateSpy.mockResolvedValue({...userOnBoardData})
            expect(res.getMockName()).toEqual('userOnBoardUpdate')
            let updateUserOnBoardResponseData = await UserOnBoardApi.userOnBoardUpdate(userOnBoardData, 'id')
            expect(updateUserOnBoardResponseData).toStrictEqual(res.mock.results[0].value)
            expect(res).toBeCalledTimes(1)
        });
        it('failed to update userOnBoardUpdate', async function () {
            const expectedError = new Error('Invalid Data')
            let res = userOnBoardUpdateSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserOnBoardApi.userOnBoardUpdate(userOnBoardData, 'id')).rejects.toThrow(expectedError)
        });
    });
    describe('userOnBoardDelete', () => {
        it('Successfully userOnBoardDelete', async function () {
            let res = userOnBoardDeleteSpy.mockResolvedValue({...userOnBoardData})
            expect(res.getMockName()).toEqual('userOnBoardDelete')
            let deleteUserOnBoardResponseData = await UserOnBoardApi.userOnBoardDelete('id')
            expect(deleteUserOnBoardResponseData).toStrictEqual(res.mock.results[0].value)
            expect(res).toBeCalledTimes(1)
        });
        it('failed to delete userOnBoardDelete', async function () {
            const expectedError = new Error('Invalid Data')
            let res = userOnBoardDeleteSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserOnBoardApi.userOnBoardDelete('id')).rejects.toThrow(expectedError)
        });
    })
    describe('userOnBoardById', () => {
        it('Successfully userOnBoardById', async function () {
            let res = userOnBoardGetSpy.mockResolvedValue({...userOnBoardData, _id: 'id'})
            expect(res.getMockName()).toEqual('userOnBoardById')
            let getUserOnBoardResponseData = await UserOnBoardApi.userOnBoardById('id')
            expect(getUserOnBoardResponseData).toStrictEqual(res.mock.results[0].value)
            expect(res).toBeCalledTimes(1)
        });
        it('failed to get userOnBoardById', async function () {
            const expectedError = new Error('Invalid Data')
            let res = userOnBoardGetSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserOnBoardApi.userOnBoardById('id')).rejects.toThrow(expectedError)
        });
    })
})
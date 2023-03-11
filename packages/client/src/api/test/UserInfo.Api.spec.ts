import {beforeEach, describe, expect, it, vi} from 'vitest'
import UserInfoApi, {IUserInfoPayload} from "../UserInfo.api";


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

describe('UserInfoApi', () => {
    let getAllUserInfoSpy = vi.spyOn(UserInfoApi, 'getAllUserInfo')
    let getUserInfoSpy = vi.spyOn(UserInfoApi, 'getUserInfo')
    let updateUserInfoSpy = vi.spyOn(UserInfoApi, 'updateUserInfo')
    let deleteUserInfoSpy = vi.spyOn(UserInfoApi, 'deleteUserInfo')
    let createUserInfoSpy = vi.spyOn(UserInfoApi, 'createUserInfo')
    beforeEach(() => {
        getAllUserInfoSpy.mockReset()
        getUserInfoSpy.mockReset()
        updateUserInfoSpy.mockReset()
        deleteUserInfoSpy.mockReset()
        createUserInfoSpy.mockReset()
    })

    let userInfoData: IUserInfoPayload = {
        permanentAddress: 'permanentAddress',
        presentAddress: 'presentAddress',
        contactNumber: "contactNumber",
        user: "user",
        dateOfBirth: "dateOfBirth",
        eContactNumber: "eContactNumber",
    }
    describe('getAllUserInfo', () => {
        it('SuccessFullyGetAllUserInfo', async function () {
            let res = getAllUserInfoSpy.mockResolvedValue([{...userInfoData, _id: 'id'}])
            let getAllUserInfoResponseData = await UserInfoApi.getAllUserInfo()
            expect(res.getMockName()).toEqual('getAllUserInfo')
            expect(res).toBeCalledTimes(1)
            expect(getAllUserInfoResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to fetch UserInfo list', async function () {
            const expectedError = new Error('Invalid Data')
            let res = getAllUserInfoSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserInfoApi.getAllUserInfo()).rejects.toEqual(expectedError)
        });
    })

    describe('getUserInfo', () => {
        it('SuccessFullyGetUserInfo', async function () {
            let res = getUserInfoSpy.mockResolvedValue({...userInfoData, _id: 'id'})
            let getUserInfoResponseData = await UserInfoApi.getUserInfo('id')
            expect(res.getMockName()).toEqual('getUserInfo')
            expect(res).toBeCalledTimes(1)
            expect(getUserInfoResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to fetch UserInfo', async function () {
            const expectedError = new Error('Invalid Data')
            let res = getUserInfoSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserInfoApi.getUserInfo('id')).rejects.toEqual(expectedError)
        });
    })
    describe('updateUserInfo', () => {
        it('SuccessFullyUpdateUserInfo', async function () {
            let res = updateUserInfoSpy.mockResolvedValue({...userInfoData, _id: 'id'})
            let updateUserInfoResponseData = await UserInfoApi.updateUserInfo('id', userInfoData)
            expect(res.getMockName()).toEqual('updateUserInfo')
            expect(res).toBeCalledTimes(1)
            expect(updateUserInfoResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to update UserInfo', async function () {
            const expectedError = new Error('Invalid Data')
            let res = updateUserInfoSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserInfoApi.updateUserInfo('id', userInfoData)).rejects.toEqual(expectedError)
        });
    })
    describe('deleteUserInfo', () => {
        it('SuccessFullyDeleteUserInfo', async function () {
            let res = deleteUserInfoSpy.mockResolvedValue({...userInfoData, _id: 'id'})
            let deleteUserInfoResponseData = await UserInfoApi.deleteUserInfo('id')
            expect(res.getMockName()).toEqual('deleteUserInfo')
            expect(res).toBeCalledTimes(1)
            expect(deleteUserInfoResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to delete UserInfo', async function () {
            const expectedError = new Error('Invalid Data')
            let res = deleteUserInfoSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserInfoApi.deleteUserInfo('id')).rejects.toEqual(expectedError)
        });
    })
    describe('createUserInfo', () => {
        it('SuccessFullyCreateUserInfo', async function () {
            let res = createUserInfoSpy.mockResolvedValue({...userInfoData, _id: 'id'})
            let createUserInfoResponseData = await UserInfoApi.createUserInfo(userInfoData)
            expect(res.getMockName()).toEqual('createUserInfo')
            expect(res).toBeCalledTimes(1)
            expect(createUserInfoResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to create UserInfo', async function () {
            const expectedError = new Error('Invalid Data')
            let res = createUserInfoSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserInfoApi.createUserInfo(userInfoData)).rejects.toEqual(expectedError)
        });
    })


})
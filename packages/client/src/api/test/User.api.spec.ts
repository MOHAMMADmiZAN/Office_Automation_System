import {beforeEach, describe, expect, it, vi} from 'vitest'
import {UserApi} from "../User.api";


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

describe('UserApi', () => {
    let getUserSpy = vi.spyOn(UserApi, 'getUser')
    let updateUserSpy = vi.spyOn(UserApi, 'updateUser')
    let deleteUserSpy = vi.spyOn(UserApi, 'deleteUser')
    let getAllUsersSpy = vi.spyOn(UserApi, 'getAllUsers')
    let changePasswordSpy = vi.spyOn(UserApi, 'changePassword')

    const user = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        password: 'password',
        role: 'role',
        status: 'status',
        avatar: 'avatar',
        _id: 'id',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        __v: 0
    }

    beforeEach(() => {
        getUserSpy.mockReset()
        updateUserSpy.mockReset()
        deleteUserSpy.mockReset()
        getAllUsersSpy.mockReset()
        changePasswordSpy.mockReset()
    })
    describe('getUser', () => {

        it('SuccessFullyGetUser', async function () {
            let getUserResponse = {
                data: {
                    message: 'User Found',
                    ...user
                }
            }

            let res = getUserSpy.mockResolvedValue({...getUserResponse})
            let getUserResponseData = await UserApi.getUser('id')
            expect(res.getMockName()).toEqual('getUser')
            expect(res).toBeCalledTimes(1)
            expect(getUserResponseData).toEqual(getUserResponse)


        })

        it('fail to fetch user data', function () {
            const expectedError = new Error('Invalid Data')
            const res = getUserSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            expect(UserApi.getUser('id')).rejects.toThrow(expectedError)


        });


    })
    describe('updateUser', () => {
        let updateUserResponse = {
            data: {
                message: 'User Updated',
                ...user
            }
        }
        let updateUserPayload = {
            ...user,
            firstName: 'firstName',
            lastName: 'lastName',
        }
        it('SuccessFull updateUser', async function () {
            let res = updateUserSpy.mockResolvedValue({...updateUserResponse})
            await expect(UserApi.updateUser('id', updateUserPayload)).resolves.toEqual(updateUserResponse)
            expect(res.getMockName()).toEqual('updateUser')
            expect(res).toBeCalledTimes(1)

        });
        it('fail to update user data', function () {
            const expectedError = new Error('Invalid Data')
            const res = updateUserSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            expect(UserApi.updateUser('id', updateUserPayload)).rejects.toThrow(expectedError)
        });


    })

    describe('deleteUser', () => {
        let deleteUserResponse = {
            data: {
                message: 'User Deleted',
                ...user
            }
        }
        it('SuccessFull deleteUser', async function () {
            let res = deleteUserSpy.mockResolvedValue({...deleteUserResponse})
            await expect(UserApi.deleteUser('id')).resolves.toEqual(deleteUserResponse)
            expect(res.getMockName()).toEqual('deleteUser')
            expect(res).toBeCalledTimes(1)


        });
        it('fail to delete user data', function () {
            const expectedError = new Error('Invalid Data')
            const res = deleteUserSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)

            expect(UserApi.deleteUser('id')).rejects.toThrow(expectedError)
        });

    })


    describe('getAllUsers', () => {
        let getUsersResponse = {
            data: {
                message: 'Users Found',
                users: [
                    {
                        ...user
                    },
                    {
                        ...user
                    }
                ]
            }
        }
        it('SuccessFull getUsers', async function () {
            let res = getAllUsersSpy.mockResolvedValue(getUsersResponse)
            let getUsersResponseData = await UserApi.getAllUsers()
            expect(getUsersResponseData).toEqual(getUsersResponse)
            expect(res.getMockName()).toEqual('getAllUsers')
            expect(res).toBeCalledTimes(1)
        });
        it('fail to get users data', async function () {
            const expectedError = new Error('Invalid Data')
            let res = getAllUsersSpy.mockRejectedValueOnce(expectedError)
            expect(res).toBeCalledTimes(0)

            await expect(UserApi.getAllUsers()).rejects.toThrow(expectedError)
        })


    })

    describe('changePassword', () => {
        let changePasswordResponse = {
            data: {
                message: 'Password has been changed successfully',
                ...user
            }
        }
        let changePasswordPayload = {
            oldPassword: 'oldPassword',
            password: 'password',
            confirmPassword: 'confirmPassword'
        }
        it('SuccessFull changePassword', async function () {
            let res = changePasswordSpy.mockResolvedValue(changePasswordResponse)
            let changePasswordResponseData = await UserApi.changePassword(changePasswordPayload)
            expect(changePasswordResponseData).toEqual(changePasswordResponse)
            expect(res.getMockName()).toEqual('changePassword')
            expect(res).toBeCalledTimes(1)

        });
        it('fail to change password', async function () {
            const expectedError = new Error('Invalid Data')
            let res = changePasswordSpy.mockRejectedValueOnce(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserApi.changePassword(changePasswordPayload)).rejects.toThrow(expectedError)
        });

    })


})




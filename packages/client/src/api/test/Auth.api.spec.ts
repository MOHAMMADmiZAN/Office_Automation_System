import {beforeEach, describe, expect, vi} from 'vitest'
import {AuthApi} from "../Auth.api";
import axios from "axios";
import login from "../../pages/login";


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

describe('AuthApi', () => {
    let loginSpy = vi.spyOn(AuthApi, 'login')
    let registerSpy = vi.spyOn(AuthApi, 'register')
    beforeEach(() => {
        loginSpy.mockReset()
        registerSpy.mockReset()

    })

    let user= {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email@mail.com',
        password: 'password',
        role: 'role',
        status: 'status',
        avatar: 'avatar',
        _id: 'id',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        __v: 0

    }
    describe('login', () => {
        let loginPayload = {
            email: 'email@mail.com',
            password: 'password'
        }
        it('SuccessFullyLogin', async function () {
            let loginResponse = {
                data: {
                    message: 'Login Successful',
                    token: 'token',
                   user: {...user}
                }
            }
            let res = loginSpy.mockResolvedValue({...loginResponse})
            let loginResponseData = await AuthApi.login(loginPayload)
            expect(res.getMockName()).toEqual('login')
            expect(res).toBeCalledTimes(1)
            expect(res).toBeCalledWith(loginPayload)
            expect(loginResponseData).toStrictEqual(loginResponse)

        });
        it('failed login throws an error ', function () {
            const expectedError = new Error('Invalid credentials')
            let res = loginSpy.mockRejectedValueOnce(expectedError)
            expect(res).toBeCalledTimes(0)
            expect(AuthApi.login(loginPayload)).rejects.toThrow(expectedError)

        });

    })

    describe('register', () => {
        let registerPayload = {
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email@mail.com',
            password: 'password',
            avatar: 'avatar'
        }
        it('SuccessFullyRegister', async function () {

            let registerResponse = {
                data: {
                    message: 'User created successfully',
                    user: {...user}
                }

            }
            let res = registerSpy.mockResolvedValue({...registerResponse})
            let registerResponseData = await AuthApi.register(registerPayload)
            expect(res.getMockName()).toEqual('register')
            expect(res).toBeCalledTimes(1)
            expect(res).toBeCalledWith(registerPayload)
            expect(registerResponseData).toStrictEqual(registerResponse)


        });
        it('failed Register throws an error ', async function () {
            const expectedError = new Error('Invalid Data')
            let res = registerSpy.mockRejectedValueOnce(expectedError)
            expect(res).toBeCalledTimes(0)
            expect(AuthApi.register(registerPayload)).rejects.toThrow(expectedError)

        });

    })


})


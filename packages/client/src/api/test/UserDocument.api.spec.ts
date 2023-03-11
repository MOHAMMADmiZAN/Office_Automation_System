import {beforeEach, describe, expect, it, vi} from 'vitest'
import {IUserDocument, UserDocumentApi} from "../UserDocument.api";


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

describe('UserDocument', () => {
    let userDocumentListSpy = vi.spyOn(UserDocumentApi, 'userDocumentList')
    let userDocumentCreateSpy = vi.spyOn(UserDocumentApi, 'userDocumentCreate')
    let userDocumentUpdateSpy = vi.spyOn(UserDocumentApi, 'userDocumentUpdate')
    let userDocumentDeleteSpy = vi.spyOn(UserDocumentApi, 'userDocumentDelete')
    beforeEach(() => {
        userDocumentListSpy.mockReset()
        userDocumentCreateSpy.mockReset()
        userDocumentUpdateSpy.mockReset()
        userDocumentDeleteSpy.mockReset()
    })

    let userDocumentData: IUserDocument = {
        title: 'title',
        document: 'document',
        user: "user",

    }
    describe('userDocumentList', () => {
        it('SuccessFullyGetAllUserDocument', async function () {
            let res = userDocumentListSpy.mockResolvedValue([{...userDocumentData, _id: 'id'}])
            let userDocumentListResponseData = await UserDocumentApi.userDocumentList()
            expect(res.getMockName()).toEqual('userDocumentList')
            expect(res).toBeCalledTimes(1)
            expect(userDocumentListResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to fetch UserDocument list', async function () {
            const expectedError = new Error('Invalid Data')
            let res = userDocumentListSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserDocumentApi.userDocumentList()).rejects.toThrow(expectedError)
        });
    });
    describe('userDocumentCreate', () => {
        it('SuccessFullyCreateUserDocument', async function () {
            let res = userDocumentCreateSpy.mockResolvedValue({...userDocumentData, _id: 'id'})
            let userDocumentCreateResponseData = await UserDocumentApi.userDocumentCreate(userDocumentData)
            expect(res.getMockName()).toEqual('userDocumentCreate')
            expect(res).toBeCalledTimes(1)
            expect(userDocumentCreateResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to create UserDocument', async function () {
            const expectedError = new Error('Invalid Data')
            let res = userDocumentCreateSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserDocumentApi.userDocumentCreate(userDocumentData)).rejects.toThrow(expectedError)
        });
    });
    describe('userDocumentUpdate', () => {
        it('SuccessFullyUpdateUserDocument', async function () {
            let res = userDocumentUpdateSpy.mockResolvedValue({...userDocumentData, _id: 'id'})
            let userDocumentUpdateResponseData = await UserDocumentApi.userDocumentUpdate(userDocumentData, 'id')
            expect(res.getMockName()).toEqual('userDocumentUpdate')
            expect(res).toBeCalledTimes(1)
            expect(userDocumentUpdateResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to update UserDocument', async function () {
            const expectedError = new Error('Invalid Data')
            let res = userDocumentUpdateSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserDocumentApi.userDocumentUpdate(userDocumentData, 'id')).rejects.toThrow(expectedError)
        });
    });
    describe('userDocumentDelete', () => {
        it('SuccessFullyDeleteUserDocument', async function () {
            let res = userDocumentDeleteSpy.mockResolvedValue({...userDocumentData, _id: 'id'})
            let userDocumentDeleteResponseData = await UserDocumentApi.userDocumentDelete('id')
            expect(res.getMockName()).toEqual('userDocumentDelete')
            expect(res).toBeCalledTimes(1)
            expect(userDocumentDeleteResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to delete UserDocument', async function () {
            const expectedError = new Error('Invalid Data')
            let res = userDocumentDeleteSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(UserDocumentApi.userDocumentDelete('id')).rejects.toThrow(expectedError)
        });
    })
})
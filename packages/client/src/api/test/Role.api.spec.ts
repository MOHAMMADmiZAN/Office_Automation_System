import {beforeEach, describe, expect, it, vi} from 'vitest'
import {RoleApi} from "../Role.api";

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


describe('RoleApi', () => {
    let roleListSpy = vi.spyOn(RoleApi, 'roleList')
    let roleCreateSpy = vi.spyOn(RoleApi, 'roleCreate')
    let roleUpdateSpy = vi.spyOn(RoleApi, 'roleUpdate')
    let roleDeleteSpy = vi.spyOn(RoleApi, 'roleDelete')
    let roleByIdSpy = vi.spyOn(RoleApi, 'roleById')


    beforeEach(() => {
        roleListSpy.mockReset()
        roleCreateSpy.mockReset()
        roleUpdateSpy.mockReset()
        roleDeleteSpy.mockReset()
        roleByIdSpy.mockReset()
    })
    let roleData = {
        name: "name",
    }
    describe('roleList', () => {
        it('SuccessFullyGetRoleList', async function () {
            let res = roleListSpy.mockResolvedValue([{...roleData, _id: 'id'}])
            let roleListResponseData = await RoleApi.roleList()
            expect(res.getMockName()).toEqual('roleList')
            expect(res).toBeCalledTimes(1)
            expect(roleListResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to fetch Role list', async function () {
            const expectedError = new Error('Invalid Data')
            let res = roleListSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(RoleApi.roleList()).rejects.toEqual(expectedError)

        });
    })
    describe('roleCreate', () => {
        it('SuccessFullyCreateRole', async function () {
            let res = roleCreateSpy.mockResolvedValue({...roleData})
            let roleCreateResponseData = await RoleApi.roleCreate(roleData)
            expect(res.getMockName()).toEqual('roleCreate')
            expect(res).toBeCalledTimes(1)
            expect(roleCreateResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to create Role', async function () {
            const expectedError = new Error('Invalid Data')
            let res = roleCreateSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(RoleApi.roleCreate(roleData)).rejects.toEqual(expectedError)

        });
    })
    describe('roleUpdate', () => {
        it('SuccessFullyUpdateRole', async function () {
            let res = roleUpdateSpy.mockResolvedValue({...roleData})
            let roleUpdateResponseData = await RoleApi.roleUpdate(roleData, 'id')
            expect(res.getMockName()).toEqual('roleUpdate')
            expect(res).toBeCalledTimes(1)
            expect(roleUpdateResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to update Role', async function () {
            const expectedError = new Error('Invalid Data')
            let res = roleUpdateSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(RoleApi.roleUpdate(roleData, 'id')).rejects.toEqual(expectedError)

        });
    })
    describe('roleDelete', () => {
        it('SuccessFullyDeleteRole', async function () {
            let res = roleDeleteSpy.mockResolvedValue({...roleData})
            let roleDeleteResponseData = await RoleApi.roleDelete('id')
            expect(res.getMockName()).toEqual('roleDelete')
            expect(res).toBeCalledTimes(1)
            expect(roleDeleteResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to delete Role', async function () {
            const expectedError = new Error('Invalid Data')
            let res = roleDeleteSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(RoleApi.roleDelete('id')).rejects.toEqual(expectedError)

        });
    })
    describe('roleById', () => {
        it('SuccessFullyGetRoleById', async function () {
            let res = roleByIdSpy.mockResolvedValue({...roleData, _id: 'id'})
            let roleByIdResponseData = await RoleApi.roleById('id')
            expect(res.getMockName()).toEqual('roleById')
            expect(res).toBeCalledTimes(1)
            expect(roleByIdResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to get Role by id', async function () {
            const expectedError = new Error('Invalid Data')
            let res = roleByIdSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(RoleApi.roleById('id')).rejects.toEqual(expectedError)

        });
    })


})
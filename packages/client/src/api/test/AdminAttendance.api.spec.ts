import {describe, expect, vi} from 'vitest'
import AdminAttendanceApi, {IAdminAttendancePayload} from "../AdminAttendance.api";


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

describe('AdminAttendanceApi', () => {
    let adminAttendanceCreateSpy = vi.spyOn(AdminAttendanceApi, 'adminAttendanceCreate')
    let adminAttendanceBYIdSpy = vi.spyOn(AdminAttendanceApi, 'adminAttendanceBYId')
    let adminAttendanceFindAllSpy = vi.spyOn(AdminAttendanceApi, 'adminAttendanceFindAll')
    let adminAttendanceUpdateSpy = vi.spyOn(AdminAttendanceApi, 'adminAttendanceUpdate')
    let adminAttendanceDeleteSpy = vi.spyOn(AdminAttendanceApi, 'adminAttendanceDelete')
    let adminAttendanceDisableWhenCalledSpy = vi.spyOn(AdminAttendanceApi, 'adminAttendanceDisableWhenCalled')
    beforeEach(() => {
        adminAttendanceCreateSpy.mockReset()
        adminAttendanceBYIdSpy.mockReset()
        adminAttendanceFindAllSpy.mockReset()
        adminAttendanceUpdateSpy.mockReset()
        adminAttendanceDeleteSpy.mockReset()
        adminAttendanceDisableWhenCalledSpy.mockReset()
    })
    let AdminAttendanceData: IAdminAttendancePayload = {
        _id: 'id',
        status: "status",
        timeLimit: "timeLimit",
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }

    describe('adminAttendanceCreate', () => {
        it('SuccessFullyCreate', async function () {
            let res = adminAttendanceCreateSpy.mockResolvedValue({...AdminAttendanceData})
            let adminAttendanceCreateResponseData = await AdminAttendanceApi.adminAttendanceCreate(AdminAttendanceData)
            expect(res.getMockName()).toEqual('adminAttendanceCreate')
            expect(res).toBeCalledTimes(1)
            expect(res).toBeCalledWith(AdminAttendanceData)
            expect(adminAttendanceCreateResponseData).toStrictEqual(AdminAttendanceData)
        })
        it('failed to create admin attendance', async function () {
            const expectedError = new Error('Invalid Data')
            let res = adminAttendanceCreateSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(AdminAttendanceApi.adminAttendanceCreate(AdminAttendanceData)).rejects.toThrow(expectedError)

        });


    })
    describe('adminAttendanceBYId', () => {
        it('SuccessFullyGetAdminAttendanceBYId', async function () {
            let res = adminAttendanceBYIdSpy.mockResolvedValue({...AdminAttendanceData})
            let adminAttendanceBYIdResponseData = await AdminAttendanceApi.adminAttendanceBYId('id')
            expect(res.getMockName()).toEqual('adminAttendanceBYId')
            expect(res).toBeCalledTimes(1)
            expect(res).toBeCalledWith(AdminAttendanceData._id)
            expect(adminAttendanceBYIdResponseData).toStrictEqual(AdminAttendanceData)
        })
        it('failed to fetch admin attendance by id', async function () {
            const expectedError = new Error('Invalid Data')
            let res = adminAttendanceBYIdSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(AdminAttendanceApi.adminAttendanceBYId('id')).rejects.toThrow(expectedError)
        });
    })
    describe('adminAttendanceFindAll', () => {
        it('SuccessFullyGetAdminAttendanceFindAll', async function () {
            let res = adminAttendanceFindAllSpy.mockResolvedValue([{...AdminAttendanceData}])
            let adminAttendanceFindAllResponseData = await AdminAttendanceApi.adminAttendanceFindAll()
            expect(res.getMockName()).toEqual('adminAttendanceFindAll')
            expect(res).toBeCalledTimes(1)
            expect(adminAttendanceFindAllResponseData).toStrictEqual(res.mock.results[0].value)
        })
        it('failed to fetch admin attendance find all', async function () {
            const expectedError = new Error('Invalid Data')
            let res = adminAttendanceFindAllSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(AdminAttendanceApi.adminAttendanceFindAll()).rejects.toThrow(expectedError)
        });
    })
    describe('adminAttendanceUpdate', () => {
        it('SuccessFullyUpdateAdminAttendance', async function () {
            let res = adminAttendanceUpdateSpy.mockResolvedValue({...AdminAttendanceData})
            let adminAttendanceUpdateResponseData = await AdminAttendanceApi.adminAttendanceUpdate(AdminAttendanceData, 'id')
            expect(res.getMockName()).toEqual('adminAttendanceUpdate')
            expect(res).toBeCalledTimes(1)
            expect(adminAttendanceUpdateResponseData).toStrictEqual(AdminAttendanceData)
        })
        it('failed to update admin attendance', async function () {
            const expectedError = new Error('Invalid Data')
            let res = adminAttendanceUpdateSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(AdminAttendanceApi.adminAttendanceUpdate(AdminAttendanceData, 'id')).rejects.toThrow(expectedError)
        });
    });
    describe('adminAttendanceDelete', () => {
        it('SuccessFullyDeleteAdminAttendance', async function () {
            let res = adminAttendanceDeleteSpy.mockResolvedValue({...AdminAttendanceData})
            let adminAttendanceDeleteResponseData = await AdminAttendanceApi.adminAttendanceDelete('id')
            expect(res.getMockName()).toEqual('adminAttendanceDelete')
            expect(res).toBeCalledTimes(1)
            expect(res).toBeCalledWith('id')
            expect(adminAttendanceDeleteResponseData).toStrictEqual(AdminAttendanceData)
        })
        it('failed to delete admin attendance', async function () {
            const expectedError = new Error('Invalid Data')
            let res = adminAttendanceDeleteSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(AdminAttendanceApi.adminAttendanceDelete('id')).rejects.toThrow(expectedError)
        });

    });
    describe('adminAttendanceDisableWhenCalled', () => {
        it('SuccessFullyDisableAdminAttendance', async function () {
            let res = adminAttendanceDisableWhenCalledSpy.mockResolvedValue({...AdminAttendanceData})
            let adminAttendanceDisableWhenCalledResponseData = await AdminAttendanceApi.adminAttendanceDisableWhenCalled()
            expect(res.getMockName()).toEqual('adminAttendanceDisableWhenCalled')
            expect(res).toBeCalledTimes(1)
            expect(adminAttendanceDisableWhenCalledResponseData).toStrictEqual(AdminAttendanceData)
        })
        it('failed to disable admin attendance', async function () {
            const expectedError = new Error('Invalid Data')
            let res = adminAttendanceDisableWhenCalledSpy.mockRejectedValue(expectedError)
            expect(res).toBeCalledTimes(0)
            await expect(AdminAttendanceApi.adminAttendanceDisableWhenCalled()).rejects.toThrow(expectedError)
        });
    })


})
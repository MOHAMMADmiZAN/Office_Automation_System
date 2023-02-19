import { useMutation, useQuery, useQueryClient } from "react-query";
import { IRoleWithId, RoleApi } from "../api/Role.Api";


export const useRole = (singleRoleId?: string) => {
    const queryClient = useQueryClient();

    const { data: roles, error: rolesError, isLoading: rolesIsLoading } = useQuery<IRoleWithId[]>('allRoles', RoleApi.roleList)
    const { mutateAsync: createRole } = useMutation(RoleApi.roleCreate, {
        onSuccess: (data) => {
            console.log(data)
        }
    })

    let Roles = roles?.filter(role => role.name !== 'super_admin')
    let superAdmin = roles?.find(role => role.name === 'super_admin')

    const { mutateAsync: editRole } = useMutation((data: IRoleWithId) => RoleApi.roleUpdate(data, singleRoleId as string), {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries("allRoles");
        }
    })

    // find role by id

    return {
        Roles,
        rolesError,
        rolesIsLoading,
        superAdmin,
        createRole,
        editRole
    }


}
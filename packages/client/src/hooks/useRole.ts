import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IRoleWithId, RoleApi } from "../api/Role.Api";
import { Role as roleNames } from '../utils/Validation'
import useAuth from "./useAuth";

const userPermissions = {
    [roleNames.SUPER_ADMIN]: ['manageEvent', 'userDetail', 'manageUser', 'userDocument', 'manageRole', 'attendance'],
    [roleNames.ADMIN]: ['manageEvent', 'userDetail', 'manageUser', 'userDocument', 'manageRole', 'attendance'],
    [roleNames.MODERATOR]: ['manageEvent', 'userDetail', 'manageUser', 'userDocument', 'manageRole', 'attendance'],
    [roleNames.SUPPORT]: ['userDetail'],
    [roleNames.USER]: [],
}


export const useRole = (singleRoleId?: string) => {
    const queryClient = useQueryClient();
    const { user } = useAuth()

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

    const checkUserPermission: Function = (section: string): any => {
        const authUserRole = roles?.filter((item) => item._id === user.role)[0]?.name
        console.log('section and role=', section, authUserRole)
        if (!authUserRole) return false;
        return userPermissions[authUserRole].includes(section);
    }

    // find role by id

    return {
        Roles,
        rolesError,
        rolesIsLoading,
        superAdmin,
        createRole,
        editRole,
        checkUserPermission
    }


}
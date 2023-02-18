import {useQuery} from "react-query";
import {IRoleWithId, RoleApi} from "../api/Role.Api";

export const useRole = () => {
    const {data:roles, error:rolesError, isLoading:rolesIsLoading} = useQuery<IRoleWithId[]>('allRoles', RoleApi.roleList)

    let Roles = roles?.filter(role => role.name !== 'super_admin')
     let superAdmin = roles?.find(role => role.name === 'super_admin')

    // find role by id

    return {
        Roles,
        rolesError,
        rolesIsLoading,
        superAdmin

    }


  }
//

import { Request } from "express";
import { PermissionMapping } from "../constants/permission-mapping.constants";
import { Permissions } from "../constants/permissions.enum";
import { ForbiddenException } from "../exceptions/forbidden.exception";

export function PermissionGuard(requiredPermission: Permissions) {
    return function (property: any, key: any, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        
        // Modify the method with permission check
        descriptor.value = async function (...args: any[]) {
            try {
                const request: Request = args[0]; // Get the first argument (the request)
                const currentUser = request['user']; // Assuming user is added to the request
                console.log(currentUser)
                const existingPermissions = PermissionMapping[currentUser?.role];

                if (!existingPermissions || !existingPermissions.includes(requiredPermission)) {
                    throw new ForbiddenException("Access to resource not allowed!");
                }

                return await originalMethod.apply(this, args); 
            } catch (error) {
                throw error; 
            }
        };

        return descriptor;
    };
}

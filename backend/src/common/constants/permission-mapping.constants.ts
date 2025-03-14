// backend/src/common/constants/permission-mapping.enum.ts

import { Permissions } from "./permissions.enum";
import { UserRoles } from "./user-role.enum";


export const PermissionMapping = {
    [UserRoles.SUPER_ADMIN]: [
        Permissions.CREATE_USER,
        Permissions.READ_USER,
        Permissions.UPDATE_USER,
        Permissions.DELETE_USER,
        Permissions.CREATE_ARTIST,
        Permissions.READ_ARTIST,
        Permissions.UPDATE_ARTIST,
        Permissions.DELETE_ARTIST,
        Permissions.CREATE_MUSIC,
        Permissions.READ_MUSIC,
        Permissions.UPDATE_MUSIC,
        Permissions.DELETE_MUSIC,
    ],
    [UserRoles.ARTIST_MANAGER]: [
        Permissions.READ_ARTIST,  // Can view artist records
        Permissions.CREATE_ARTIST,  // Can create new artist records
        Permissions.UPDATE_ARTIST,  // Can update existing artist records
        Permissions.DELETE_ARTIST,  // Can delete artist records
        Permissions.READ_MUSIC,  // Can fetch songs by artist id
    ],
    [UserRoles.ARTIST]: [
        Permissions.READ_MUSIC,  // Can list songs
        Permissions.CREATE_MUSIC,  // Can create a new song
        Permissions.UPDATE_MUSIC,  // Can update their own music records
        Permissions.DELETE_MUSIC,  // Can delete their own music records
    ]
};

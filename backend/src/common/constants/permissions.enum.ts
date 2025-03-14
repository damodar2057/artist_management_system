// backend/src/common/constants/permissions.enum.ts

export enum Permissions {
    // User permissions
    CREATE_USER = "create::user",
    READ_USER = "read::user",
    UPDATE_USER = "update::user",
    DELETE_USER = "delete::user",

    // Artist permissions
    CREATE_ARTIST = "create::artist",
    READ_ARTIST = "read::artist",
    UPDATE_ARTIST = "update::artist",
    DELETE_ARTIST = "delete::artist",

    // Music permissions
    CREATE_MUSIC = "create::music",
    READ_MUSIC = "read::music",
    UPDATE_MUSIC = "update::music",
    DELETE_MUSIC = "delete::music"
}

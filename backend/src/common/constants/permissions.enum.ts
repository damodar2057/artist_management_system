// backend/src/common/constants/permissions.enum.ts

export enum Permissions {
    // User permissions
    CREATE_USER = "create::user",
    READ_USER = "read::user",
    READ_USER_ALL = "read::user_all",
    READ_USER_ONE = "read::user_one",
    UPDATE_USER = "update::user",
    DELETE_USER = "delete::user",

    // Artist permissions
    CREATE_ARTIST = "create::artist",
    READ_ARTIST = "read::artist",
    READ_ARTIST_ALL = "read::artist_all",
    READ_ARTIST_ONE = "read::artist_one",
    UPDATE_ARTIST = "update::artist",
    DELETE_ARTIST = "delete::artist",

    // Music permissions
    CREATE_MUSIC = "create::music",
    READ_MUSIC = "read::music",
    READ_MUSIC_ALL = "read::music_all",
    READ_MUSIC_ONE = "read::music_one",
    UPDATE_MUSIC = "update::music",
    DELETE_MUSIC = "delete::music"
}

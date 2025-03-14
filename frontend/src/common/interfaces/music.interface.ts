//

import { Genre } from "common/constants/genre.enum";

export interface IMusic {

    id?: number;
    title: string;
    album_name: Date;
    genre: Genre;
    artist_id: string;
    created_at?: Date;
    updated_at?: Date;
}
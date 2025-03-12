//

import { Gender } from "../constants/gender.enum";
import { Genre } from "../constants/genre.enum";

export interface IMusicEntity {
    id?: number;
    title: string;
    album_name: Date;
    genre: Genre;
    artist_id: string;
    created_at?: Date;
    updated_at?: Date;
}

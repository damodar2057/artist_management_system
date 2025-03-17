//

import { Genre } from "common/constants/genre.enum";

export interface IMusic {

    id?: number;
    title: string;
    album_name: string;
    genre: Genre;
    artist_id: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface ICreateMusic {
  
    title: string;
    album_name: string;
    genre: Genre;
    artist_id: string;  
}
export interface IUpdateMusic {

    title?: string;
    album_name?: string;
    genre?: Genre;
    artist_id?: string;

}
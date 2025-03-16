// backend/src/dtos/music.dto.ts

import { Genre } from "src/common/constants/genre.enum";


export interface CreateMusicDto {
    title: string;
    album_name: string;
    genre: Genre;
    artist_id: string;

}


export interface UpdateMusicDto {
    title?: string;
    album_name?: string;
    genre?: Genre;
    artist_id?: string;
}
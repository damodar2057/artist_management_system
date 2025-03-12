// backend/src/dtos/artist.dto.ts

import { Gender } from "src/common/constants/gender.enum";


export interface CreateArtistDto {
    name: string;
    dob: Date;
    gender: Gender;
    address: string;
    first_release_year?: number;
    no_of_albums_released: number;
}

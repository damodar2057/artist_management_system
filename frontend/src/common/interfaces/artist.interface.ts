//

import { Gender } from "../../common/constants/gender.enum";

export interface IArtist {
    id?: number;
    name: string;
    dob: Date;
    gender: Gender;
    address: string;
    first_release_year?: number;
    no_of_albums_released: number;
    created_at?: Date;
    updated_at?: Date;

}
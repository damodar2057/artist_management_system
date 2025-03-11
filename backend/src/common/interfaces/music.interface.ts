//

import { Gender } from "../constants/gender.enum";

export interface IMusicEntity {
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

//

import { Gender } from "../constants/gender.enum";
import { UserRoles } from "../constants/user-role.enum";


export interface IUserEntity {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    dob: Date;
    gender: Gender;
    role: UserRoles;
    address: string;
    created_at?: Date;
    updated_at?: Date | null;
}

//

import { Gender } from "../constants/gender.enum";
import { UserRoles } from "../constants/user-role.enum";


export interface IJwtPayload {
    email: string;
    role: UserRoles;
    first_name: string;
    last_name: string;
    phone: string;
    dob: Date;
    gender: Gender;
    address: string;

}
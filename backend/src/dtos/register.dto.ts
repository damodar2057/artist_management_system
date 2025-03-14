// backend/src/dtos/register.dto.ts

import { Gender } from "src/common/constants/gender.enum";
import { UserRoles } from "src/common/constants/user-role.enum";


export class RegisterDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    dob: string;
    gender: Gender;
    role: UserRoles;
    address: string;    
}
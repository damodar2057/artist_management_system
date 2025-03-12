// backend/src/dtos/user.dto.ts

import { Gender } from "src/common/constants/gender.enum";
import { UserRoles } from "src/common/constants/user-role.enum";


export class CreateUserDto {
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
//

import { Gender } from "common/constants/gender.enum";
import { UserRoles } from "common/constants/user-role.enum";


export interface IRegister {
       first_name: string;
        last_name: string;
        email: string;
        phone: string;
        dob: string;
        gender: Gender;
        role: UserRoles;
        address: string;
}
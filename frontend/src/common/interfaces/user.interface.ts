//


import { Gender } from "common/constants/gender.enum";
import { UserRoles } from "common/constants/user-role.enum";


export interface IUser {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    dob: string;
    gender: Gender;
    role: UserRoles;
    address: string;
    created_at?: string;
    updated_at?: string | null;
}

export interface ICreateUser {
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

export interface IUpdateUser {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    dob: string;
    gender: Gender;
    role: UserRoles;
    address: string;
}
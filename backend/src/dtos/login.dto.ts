//   backend/src/dtos/login.dto.ts

import { IsString } from "src/common/decorators/string-validator.decorator";


export class LoginDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
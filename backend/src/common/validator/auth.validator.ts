//

import { LoginDto } from "src/dtos/login.dto";


function validateRegister(data) {
    let errors = [];

    if (!data.username || data.username.length < 3) {
        errors.push("Username must be at least 3 characters long.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push("Invalid email format.");
    }

    if (!data.password || data.password.length < 6) {
        errors.push("Password must be at least 6 characters long.");
    }

    return errors;
}

function validateLogin(data: LoginDto) {
    let errors = [];

    console.log(data)

    if (!data.username || !data.password) {
        errors.push("Email and password are required.");
    }

    return errors;
}


export {
    validateLogin,
    validateRegister
}
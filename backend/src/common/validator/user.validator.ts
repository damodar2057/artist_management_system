//


function validateUserUpdate(data) {
    let errors = [];

    if (data.username && data.username.length < 3) {
        errors.push("Username must be at least 3 characters long.");
    }

    if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            errors.push("Invalid email format.");
        }
    }

    return errors;
}
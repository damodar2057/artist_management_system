// 

import userApiManager from "../apis/user.api";

window.onload = () => {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        window.location.href = "src/pages/dashboard.html";
    }
};

const registerForm = document.querySelector(".registerForm form") as HTMLFormElement;
const errorElements: { [key: string]: HTMLParagraphElement } = {
    username: document.createElement("p"),
    password: document.createElement("p"),
    email: document.createElement("p"),
    phone: document.createElement("p"),
    dob: document.createElement("p"),
    gender: document.createElement("p"),
    role: document.createElement("p"),
    address: document.createElement("p"),
    first_name: document.createElement("p"),
    last_name: document.createElement("p"),
};

// Append error messages to respective fields
document.querySelector("#username")?.insertAdjacentElement("afterend", errorElements.username);
document.querySelector("#password")?.insertAdjacentElement("afterend", errorElements.password);
document.querySelector("#email")?.insertAdjacentElement("afterend", errorElements.email);
document.querySelector("#phone")?.insertAdjacentElement("afterend", errorElements.phone);
document.querySelector("#dob")?.insertAdjacentElement("afterend", errorElements.dob);
document.querySelector("#first-name")?.insertAdjacentElement("afterend", errorElements.first_name);
document.querySelector("#last-name")?.insertAdjacentElement("afterend", errorElements.last_name);
document.querySelector("#gender")?.insertAdjacentElement("afterend", errorElements.gender);
document.querySelector("#role")?.insertAdjacentElement("afterend", errorElements.role);
document.querySelector("#address")?.insertAdjacentElement("afterend", errorElements.address);

Object.values(errorElements).forEach(errorEl => {
    errorEl.style.color = "red";
    errorEl.style.fontSize = "14px";
    errorEl.style.marginTop = "5px";
    errorEl.style.display = "none";
});

registerForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    // Reset previous errors
    Object.values(errorElements).forEach(errorEl => {
        errorEl.innerHTML = "";
        errorEl.style.display = "none";
    });

    // Get the values
    const formData = {
        username: (registerForm.querySelector("#username") as HTMLInputElement).value.trim(),
        password: (registerForm.querySelector("#password") as HTMLInputElement).value.trim(),
        email: (registerForm.querySelector("#email") as HTMLInputElement).value.trim(),
        phone: (registerForm.querySelector("#phone") as HTMLInputElement).value.trim(),
        dob: (registerForm.querySelector("#dob") as HTMLInputElement).value,
        first_name: (registerForm.querySelector("#first-name") as HTMLInputElement).value.trim(),
        last_name: (registerForm.querySelector("#last-name") as HTMLInputElement).value.trim(),
        gender: (registerForm.querySelector("#gender") as HTMLInputElement).value,
        role: (registerForm.querySelector("#role") as HTMLInputElement).value.trim(),
        address: (registerForm.querySelector("#address") as HTMLInputElement).value.trim(),
    };

    let hasError = false;

    // Validate required fields
    Object.entries(formData).forEach(([key, value]) => {
        if (!value) {
            errorElements[key].innerHTML = `*${key.replace("_", " ").toUpperCase()} is required`;
            errorElements[key].style.display = "block";
            errorElements[key].style.fontStyle = "italic";
            hasError = true;
        }
    });

    if (hasError) return;

    try {
        const res: any = await userApiManager.createUser(formData);
        console.log(res);
        alert(res.message);
        window.location.href = '/src/pages/login.html'
    } catch (error) {
        console.error(error);
    }
});

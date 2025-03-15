import authApiManager from "../apis/auth.api";
import { ILoginResponse } from "common/interfaces/response.interface";

window.onload = () => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        window.location.href = "/src/pages/dashboard.html";
    }
};

const errorElements: { [key: string]: HTMLParagraphElement } = {
    username: document.createElement("p"),
    password: document.createElement("p"),
};

document.getElementById("submitButton")?.addEventListener("click", async (ev) => {
    ev.preventDefault();

    const usernameInput = document.getElementById("username") as HTMLInputElement | null;
    const passwordInput = document.getElementById("password") as HTMLInputElement | null;

    const formData = {
        username: usernameInput?.value.trim() || "",
        password: passwordInput?.value.trim() || "",
    };

    // Append error messages to respective fields
    usernameInput?.insertAdjacentElement("afterend", errorElements.username);
    passwordInput?.insertAdjacentElement("afterend", errorElements.password);

    // Reset error messages
    Object.values(errorElements).forEach((errorEl) => {
        errorEl.innerHTML = "";
        errorEl.style.color = "red";
        errorEl.style.fontSize = "14px";
        errorEl.style.marginTop = "5px";
        errorEl.style.display = "none";
    });

    // Validate form fields
    let hasError = false;

    Object.entries(formData).forEach(([key, value]) => {
        if (!value) {
            errorElements[key].innerHTML = `*${key.replace("_", " ")} is required`;
            errorElements[key].style.display = "block";
            errorElements[key].style.fontStyle = "italic";
            hasError = true;
        }
    });

    if (hasError) return;

    try {
        const res: ILoginResponse = await authApiManager.login({
            username: formData.username,
            password: formData.password,
        });

        if (res.data?.accessToken) {
            localStorage.setItem("accessToken", res.data.accessToken);
            window.location.href = "/src/pages/dashboard.html";
        }
    } catch (error) {
        console.error("Login failed:", error);
        errorElements.username.innerHTML = "*Invalid credentials";
        errorElements.username.style.display = "block";
    }
});

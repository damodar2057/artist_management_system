//

import { ICreateUser } from "common/interfaces/user.interface";
import userApiManager from "../apis/user.api";
import toastComponent from "../components/toast/toastComponent";
import { UserRoles } from "../common/constants/user-role.enum";
import { Gender } from "../common/constants/gender.enum";
import { clearErrors, showError } from "../utils/validation.util";


function attachUserFormListener() {
    // Select the dynamically added form
    const userCreateForm = document.querySelector("#create-user-form-id") as HTMLFormElement;

    if (userCreateForm) {
        userCreateForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            // Get the form values
            const firstNameInput = userCreateForm.querySelector("#firstName") as HTMLInputElement;
            const lastNameInput = userCreateForm.querySelector("#lastName") as HTMLInputElement;
            const emailInput = userCreateForm.querySelector("#userEmail") as HTMLInputElement;
            const passwordInput = userCreateForm.querySelector("#userPassword") as HTMLInputElement;
            const phoneInput = userCreateForm.querySelector("#userPhone") as HTMLInputElement;
            const dobInput = userCreateForm.querySelector("#userDOB") as HTMLInputElement;
            const roleInput = userCreateForm.querySelector("#userRole") as HTMLInputElement;
            const genderInput = userCreateForm.querySelector("#userGender") as HTMLInputElement;
            const addressInput = userCreateForm.querySelector("#userAddress") as HTMLInputElement;

            // Clear previous errors
            clearErrors(userCreateForm);

            let isValid = true;

            // Required field validation
            if (!firstNameInput.value.trim()) {
                showError(firstNameInput, "First name is required.")
                isValid = false;
            }

            if (!lastNameInput.value.trim()) {
                showError(lastNameInput, "Last name is required.")
                isValid = false;
            }

            if (!emailInput.value.trim()) {
                showError(emailInput, "Email is required.")
                isValid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
                showError(emailInput, "Invalid email format.");
                isValid = false;
            }

            if (!passwordInput.value.trim()) {
                showError(passwordInput, "Password is required.")
                isValid = false
            } else if (passwordInput.value.length < 6) {
                showError(passwordInput, "Password must be at least 6 characters.")
            }

            if (!phoneInput.value.trim()) {
                showError(phoneInput, "Phone number must be 10 digits.")
            } else if (!/^\d{10}$/.test(phoneInput.value)) {
                showError(phoneInput, "Phone number must be 10 digits.");
                isValid = false;
            }


            if (!dobInput.value.trim()) {
                showError(dobInput, "Date of birth is required.");
                isValid = false;
            }

            if (!roleInput.value.trim()) {
                showError(roleInput, "Role is required.");
                isValid = false;
            }

            if (!genderInput.value.trim()) {
                showError(genderInput, "Gender is required.");
                isValid = false;
            }

            if (!addressInput.value.trim()) {
                showError(addressInput, "Address is required.");
                isValid = false;
            }

            if (!isValid) {
                return;
            }
            // Create payload
            const payload: ICreateUser = {
                first_name: firstNameInput.value,
                last_name: lastNameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                phone: phoneInput.value,
                dob: dobInput.value,
                role: roleInput.value as UserRoles,
                gender: genderInput.value as Gender,
                address: addressInput.value,
            };

            console.log(payload);

            try {
                await userApiManager.createUser(payload);
                userCreateForm.reset();
                toastComponent("User created successfully!", "success");
            } catch (error: any) {
                console.error(`Failed to create user: ${error}`);
                toastComponent(error.message, "error");
            }
        });
    }
}

export default attachUserFormListener;
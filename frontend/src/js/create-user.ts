//



function attachUserFormListener() {
    // Select the dynamically added form
    const userCreateForm = document.querySelector(".create-user-container form") as HTMLFormElement;

    if (userCreateForm) {
        userCreateForm.addEventListener("click", async (event) => {
            event.preventDefault();

            // Get the form values
            const firstName = (document.getElementById("firstName") as HTMLInputElement).value;
            const lastName = (document.getElementById("lastName") as HTMLInputElement).value;
            const userEmail = (document.getElementById("userEmail") as HTMLInputElement).value;
            const userPassword = (document.getElementById("userPassword") as HTMLInputElement).value;
            const userPhone = (document.getElementById("userPhone") as HTMLInputElement).value;
            const userDOB = (document.getElementById("userDOB") as HTMLInputElement).value;
            const userRole = (document.getElementById("userRole") as HTMLInputElement).value;
            const userGender = (document.getElementById("userGender") as HTMLInputElement).value;
            const userAddress = (document.getElementById("userAddress") as HTMLInputElement).value;

            // Validate input fields
            if (!firstName || !lastName || !userEmail || !userPassword || !userPhone || !userDOB) {
                // alert("First Name, Email, and Password are required");
                return;
            }
            const payload = { firstName, lastName, userEmail, userPassword, userPhone, userDOB, userRole, userGender, userAddress };
            console.log(payload);

            // try {
            //     await postUser(payload);
            //     // alert("User created successfully!");
            //     userCreateForm?.reset();
            // } catch (error) {
            //     console.error(`Failed to create user: ${error}`);
            // }
        });
    } 
}

export default attachUserFormListener;
const CreateUserForm = () => {
    return `
        <div class="create-user-container" id="">
            <div class="text">
                Create User
            </div>
            <form action="#" id="create-user-form-id">

                <!-- First Name Field -->
                <div class="form-row">
                    <div class="input-data">
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" required>
                    </div>
                </div>

                <!-- Last Name Field -->
                <div class="form-row">
                    <div class="input-data">
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" required>
                    </div>
                </div>

                <!-- Email Address Field -->
                <div class="form-row">
                    <div class="input-data">
                        <label for="userEmail">Email Address</label>
                        <input type="email" id="userEmail" required>
                    </div>
                </div>

                <!-- Password Field -->
                <div class="form-row">
                    <div class="input-data">
                        <label for="userPassword">Password</label>
                        <input type="password" id="userPassword" required>
                    </div>
                </div>

                <!-- Phone Field -->
                <div class="form-row">
                    <div class="input-data">
                        <label for="userPhone">Phone</label>
                        <input type="text" id="userPhone" required>
                    </div>
                </div>

                <!-- Date of Birth Field -->
                <div class="form-row">
                    <div class="input-data">
                        <label for="userDOB">Date of Birth</label>
                        <input type="date" id="userDOB" required>
                    </div>
                </div>

                <!-- Role Field -->
                <div class="form-row">
                    <div class="input-data">
                        <label for="userRole">Role</label>
                        <select id="userRole" required>
                            <option value="super_admin">Super Admin</option>
                            <option value="artist">Artist</option>
                            <option value="artist_manager">Artist Manager</option>
                        </select>
                    </div>
                </div>

                <!-- Gender Field -->
                <div class="form-row">
                    <div class="input-data">
                        <label for="userGender">Gender</label>
                        <select id="userGender" required>
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                            <option value="o">Other</option>
                        </select>
                    </div>
                </div>

                <!-- Address Field -->
                <div class="form-row">
                    <div class="input-data">
                        <label for="userAddress">Address</label>
                        <input type="text" id="userAddress" required>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="form-row submit-btn">
                    <div class="input-data">
                        <div class="inner"></div>
                        <button type="submit"  value="Submit">Submit</button>
                    </div>
                </div>

            </form>
        </div>
    `;
};

export default CreateUserForm;

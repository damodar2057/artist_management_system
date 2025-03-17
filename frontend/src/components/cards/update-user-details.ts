//

import { IUser } from "../../common/interfaces/user.interface";

function loadUpdateUserDetailsComponent(user: IUser) {
    return `
        <div class="update-user-details-card">
            <h2>Update User Details</h2>
            <form id="update-user-form">
            <div class="field-container">
                <div class="form-group">
                    <label for="first-name">First Name</label>
                    <input type="text" id="first-name" name="first_name" value="${user.first_name}"  />
                </div>
                <div class="form-group">
                    <label for="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last_name" value="${user.last_name}"  />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" value="${user.email}"  />
                </div>
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="text" id="phone" name="phone" value="${user.phone}"  />
                </div>
                <div class="form-group">
                    <label for="dob">Date of Birth</label>
                    <input type="date" id="dob" name="dob" value="${new Date(user.dob).toISOString().split('T')[0]}"  />
                </div>
                <div class="form-group">
                    <label for="role">Role</label>
                    <input type="text" id="role" name="role" value="${user.role}"  />
                </div>
                <div class="form-group">
                    <label for="gender">Gender</label>
                    <select id="gender" name="gender" >
                        <option value="m" ${user.gender === 'm' ? 'selected' : ''}>Male</option>
                        <option value="f" ${user.gender === 'f' ? 'selected' : ''}>Female</option>
                        <option value="o" ${user.gender === 'o' ? 'selected' : ''}>Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <textarea id="address" name="address" >${user.address}</textarea>
                </div>
                </div>
                <button type="submit">Update User</button>
            </form>
        </div>
    `;
}


export default loadUpdateUserDetailsComponent
//

import { IUser } from 'common/interfaces/user.interface';

export function loadUserDetailsCard(user: IUser) {
    return `
        <div class="record-details-card">
            <h2>User Details</h2>
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>First Name:</strong> ${user.first_name}</p>
            <p><strong>Last Name:</strong> ${user.last_name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Date of Birth:</strong> ${user.dob}</p>
            <p><strong>Role:</strong> ${user.role}</p>
            <p><strong>Gender:</strong> ${user.gender}</p>
            <p><strong>Address:</strong> ${user.address}</p>
            <p><strong>Created At:</strong> ${user.created_at}</p>
            <p><strong>Updated At:</strong> ${user.updated_at}</p>
        </div>
    `;
}

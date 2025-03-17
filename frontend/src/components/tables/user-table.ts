import { IUser } from '../../common/interfaces/user.interface';
import { tableConstants } from '../../common/constants/table.constants';

function getUsersTableHtml(content: IUser[]) {
    return `
        <table border="1" id="user-table">
            <thead>
                <tr>
                    ${Object.values(tableConstants.userTableHeaders)
                        .map((header) => `<th>${header}</th>`)
                        .join("")}
                </tr>
            </thead>
            <tbody>
                ${content.length > 0 ?
                    content.map((user) => `
                        <tr>
                            <td><a href="#">${user.id || ""}</a></td>
                            <td>${user.first_name}</td>
                            <td>${user.last_name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td>${user.dob ? new Date(user.dob).toDateString() : ""}</td> <!-- Formatted dob -->
                            <td>${user.gender === 'm' ? 'Male' : user.gender === 'f' ? 'Female' : 'Other'}</td>
                            <td>${user.role === 'super_admin' ? 'Super Admin': user.role === 'artist_manager' ? 'Artist Manager': 'Artist'}</td>
                            <td>${user.address}</td>
                            <td>${user.created_at ? new Date(user.created_at).toDateString() : ""}</td> <!-- Formatted created_at -->
                            <td>${user.updated_at ? new Date(user.updated_at).toDateString() : ""}</td> <!-- Formatted updated_at -->
                            <td><button type="button" data-id="${user.id || ""}" class="update-btn">Update</button></td>
                            <td><button type="button" data-id="${user.id || ""}" class="delete-btn">Delete</button></td>
                        </tr>
                    `).join("") :
                    `<tr><td colspan="12">No records found!!!</td></tr>`} <!-- No records found message -->
            </tbody>
        </table>
        <div id="pagination-container" style=""></div>

    `;
}

export default getUsersTableHtml;

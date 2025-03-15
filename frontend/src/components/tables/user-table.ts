//
import { IUser } from '../../common/interfaces/user.interface';
import { tableConstants } from '../../common/constants/table.constants'

function getUsersTableHtml(content: IUser[]) {
    return `
        <table border="1" id="user-table">
            <thead>
                <tr>
                    ${Object.values(tableConstants.userTableHeaders)
            .map((header) => `<th>${header}</th>`)
            .join("")
            }
            </tr>
            </thead>
            <tbody>
            ${content?.map((user) => `
                    <tr>
                    <td><a href="#">${user.id || ""}</a></td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.dob}</td>
                    <td>${user.gender}</td>
                    <td>${user.role}</td>
                    <td>${user.address}</td>
                    <td>${user.created_at || ""}</td>
                    <td>${user.updated_at || ""}</td>
                    <td><button type="button" data-id="${user.id || ""}" class="update-btn">Update</button></td>
                    <td><button type="button" data-id="${user.id || ""}" class="delete-btn">Delete</button></td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}


export default getUsersTableHtml;
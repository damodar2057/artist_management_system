//
import { IUser } from '../../common/interfaces/user.interface';
import { tableConstants } from '../../common/constants/table.constants'

function getUsersTableHtml(content: IUser[]) {
    console.log('rendering user table');
    console.log(content)
    return `
        <table border="1">
            <thead>
                <tr>
                    ${Object.values(tableConstants.userTableHeaders)
                        .map((header) => `<th>${header}</th>`)
                        .join("")
                    }
                </tr>
            </thead>
            <tbody>
                ${content.map((user) => `
                    <tr>
                        <td>${user.id || ""}</td>
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
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}


export default getUsersTableHtml;
//
import { tableConstants } from '../../common/constants/table.constants'
import { IMusic } from '../../common/interfaces/music.interface';

function getMusicsTableHtml(content: IMusic[]) {
    console.log('rendering user table');
    return `
        <table border="1">
            <thead>
                <tr>
                    ${Object.values(tableConstants.musicTableHeaders)
            .map((header) => `<th>${header}</th>`)
            .join("")
        }
                </tr>
            </thead>
            <tbody>
                ${content.map((music) => `
                    <tr>
                        <td><a href="#">${music.id || ""}</a></td>
                        <td>${music.title}</td>
                        <td>${music.album_name}</td>
                        <td>${music.genre}</td>
                        <td>${music.artist_id}</td>
                        <td>${music.created_at || ""}</td>
                        <td>${music.updated_at || ""}</td>
                        <td><button type="button" data-id="${music.id || ""}" class="update-btn">Update</button></td>
                         <td><button type="button" data-id="${music.id || ""}" class="delete-btn">Delete</button></td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}


export default getMusicsTableHtml;
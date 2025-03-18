import { tableConstants } from '../../common/constants/table.constants';
import { IMusic } from '../../common/interfaces/music.interface';
import { Genre } from 'common/constants/genre.enum';

function getMusicsTableHtml(content: IMusic[]) {
    console.log(content.length)
    console.log('Rendering music table');
    return `
        <table border="1" id="music-table">
            <thead>
                <tr>
                    ${Object.values(tableConstants.musicTableHeaders)
                        .map((header) => `<th>${header}</th>`)
                        .join("")}
                </tr>
            </thead>
            <tbody>
                ${content.length > 0 ?
                    content.map((music) => `
                        <tr>
                            <td><a href="#">${music.id || ""}</a></td>
                            <td>${music.title}</td>
                            <td>${music.album_name ||  ""}</td> <!-- Formatted album name if it's a Date -->
                            <td>${music.genre}</td> <!-- Assuming genre is an enum and needs mapping -->
                            <td>${music.artist_id}</td>
                            <td>${music.created_at ? new Date(music.created_at).toDateString() : ""}</td> <!-- Formatted created_at -->
                            <td>${music.updated_at ? new Date(music.updated_at).toDateString() : ""}</td> <!-- Formatted updated_at -->
                            <td><button type="button" data-id="${music.id || ""}" class="update-btn">Update</button></td>
                            <td><button type="button" data-id="${music.id || ""}" class="delete-btn">Delete</button></td>
                        </tr>
                    `).join("") :
                    `<tr><td colspan="9">No records found!!!</td></tr>`} <!-- No records found message -->
            </tbody>
        </table>
                <div id="pagination-container" style=""></div>

    `;
}

export default getMusicsTableHtml;

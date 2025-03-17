// 

import { tableConstants } from '../../common/constants/table.constants';
import { IMusic } from '../../common/interfaces/music.interface';

function loadViewSongsByArtistIdTable(content: IMusic[]) {

    return `
        <table border="1" id="music-table">
            <thead>
                <tr>
                    ${Object.values(tableConstants.discoverSongsTableHeaders)
                        .map((header) => `<th>${header}</th>`)
                        .join("")}
                </tr>
            </thead>
            <tbody>
                ${content.length > 0 ?
                    content.map((music) => `
                        <tr>
                            <td>${music.id || ""}</td>
                            <td>${music.title}</td>
                            <td>${music.album_name ||  ""}</td> <!-- Formatted album name if it's a Date -->
                            <td>${music.genre}</td> <!-- Assuming genre is an enum and needs mapping -->
                            <td>${music.artist_id}</td>
                            <td>${music.created_at ? new Date(music.created_at).toDateString() : ""}</td> <!-- Formatted created_at -->
                            <td>${music.updated_at ? new Date(music.updated_at).toDateString() : ""}</td> <!-- Formatted updated_at -->
                        </tr>
                    `).join("") :
                    `<tr><td colspan="9">No records found!!!</td></tr>`} <!-- No records found message -->
            </tbody>
        </table>
                <div id="pagination-container" style=""></div>

    `;
}

export default loadViewSongsByArtistIdTable;

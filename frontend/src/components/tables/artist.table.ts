//  

import { IArtist } from 'common/interfaces/artist.interface';
import { tableConstants } from '../../common/constants/table.constants';

export function getArtistsTable(content: IArtist[]) {
    return `
        <div class="import-export-artist-container" id="import-export-artist-container">
        <input type="file" id="artistCsvInput" accept=".csv" style="display: none;" />
        <button type="button" id="import-artist-button">Import</button>
        <button type="button" id="export-artist-button">Export </button>
        </div>
        <table border="1" id="artist-table">
            <thead>
                <tr>
                    ${Object.values(tableConstants.artistTableHeaders)
                        .map((header) => `<th>${header}</th>`)
                        .join("")}
                </tr>
            </thead>
            <tbody>
                ${content.length > 0 ? 
                    content.map(artist => `
                        <tr>
                            <td><a href="#">${artist.id || ""}</a></td>
                            <td>${artist.name}</td>
                            <td>${artist.dob}</td>
                            <td>${artist.gender === 'm' ? 'Male' : artist.gender === 'f' ? 'Female' : 'Other'}</td>
                            <td>${artist.address}</td>
                            <td>${artist.first_release_year}</td>
                            <td>${artist.no_of_albums_released}</td>
                            <td>${artist.created_at}</td>
                            <td>${artist.updated_at || "N/A"}</td>
                            <td><button type="button" data-id="${artist.id || ""}" class="update-btn">Update</button></td>
                            <td><button type="button" data-id="${artist.id || ""}" class="delete-btn">Delete</button></td>
                            <td><button type="button" data-id="${artist.id || ""}" class="list-artist-songs-btn">View Artist Songs</button></td>
                        </tr>
                    `).join('') : 
                    `<tr><td colspan="10">No records found!!!</td></tr>`}
            </tbody>
        </table>
                <div id="pagination-container" style=""></div>

    `;
}

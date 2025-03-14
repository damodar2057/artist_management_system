//
import { IArtist } from 'common/interfaces/artist.interface'
import { tableConstants } from '../../common/constants/table.constants'

export function getArtistsTable(content: IArtist[]) {
    return `
           <table border="1">
                   <thead>
                       <tr>
                           ${Object.values(tableConstants.artistTableHeaders)
            .map((header) => `<th>${header}</th>`)
            .join("")
        }
                       </tr>
                   </thead>
            <tbody>
                ${content.map(artist => `
                    <tr>
                        <td>${artist.id}</td>
                        <td>${artist.name}</td>
                        <td>${artist.dob}</td>
                        <td>${artist.gender}</td>
                        <td>${artist.address}</td>
                        <td>${artist.first_release_year}</td>
                        <td>${artist.no_of_albums_released}</td>
                        <td>${artist.created_at}</td>
                        <td>${artist.updated_at || "N/A"}</td>
                    </tr>
                `).join('')}
            </tbody>
               </table>
    `
}
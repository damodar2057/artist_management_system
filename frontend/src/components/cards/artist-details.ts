import { IArtist } from '../../common/interfaces/artist.interface';

export function loadArtistDetailsCard(artist: IArtist) {
    return `
        <div class="record-details-card">
            <h2>Artist Details</h2>
            <p><strong>ID:</strong> ${artist.id}</p>
            <p><strong>Name:</strong> ${artist.name}</p> <!-- Assuming first_name is correct -->
            <p><strong>Date of Birth:</strong> ${artist.dob}</p> <!-- Assuming last_name is correct -->
            <p><strong>Address:</strong> ${artist.address}</p> <!-- Assuming email is correct -->
            <p><strong>First Release Year:</strong> ${artist.first_release_year}</p> <!-- Corrected -->
            <p><strong>Gender:</strong> ${artist.gender}</p> <!-- Corrected -->
            <p><strong>Number of Albums Released:</strong> ${artist.no_of_albums_released}</p> <!-- Corrected -->

            <p><strong>Created At:</strong> ${artist.created_at}</p>
            <p><strong>Updated At:</strong> ${artist.updated_at}</p>
        </div>
    `;
}

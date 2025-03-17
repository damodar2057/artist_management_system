//


import { IMusic } from '../../common/interfaces/music.interface';

export function loadMusicDetailsCard(music: IMusic) {
    return `
        <div class="record-details-card">
            <h2>Music Details</h2>
            <p><strong>ID:</strong> ${music.id || 'N/A'}</p>
            <p><strong>Title:</strong> ${music.title}</p>
            <p><strong>Album Name:</strong> ${music.album_name}</p> <!-- Assuming album_name is a Date object -->
            <p><strong>Genre:</strong> ${music.genre}</p> <!-- Mapping genre enum to a string -->
            <p><strong>Artist ID:</strong> ${music.artist_id}</p>

            <p><strong>Created At:</strong> ${music.created_at ? music.created_at : 'N/A'}</p>
            <p><strong>Updated At:</strong> ${music.updated_at ? music.updated_at : 'N/A'}</p>
        </div>
    `;
}

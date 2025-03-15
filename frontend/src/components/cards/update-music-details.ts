//

import { IMusic } from "../../common/interfaces/music.interface";

function loadUpdateMusicDetailsComponent(music: IMusic) {
    return `
        <div class="update-music-details-card">
            <h2>Update Music Details</h2>
            <form id="update-music-form">
                <div class="field-container">
                    <div class="form-group">
                        <label for="title">Music Title</label>
                        <input type="text" id="title" name="title" value="${music.title}" required />
                    </div>
                    <div class="form-group">
                        <label for="artist">Artist</label>
                        <input type="text" id="artist" name="artist" value="${music.artist_id}" required />
                    </div>
                    <div class="form-group">
                        <label for="album_name">Album Name</label>
                        <input type="text" id="album_name" name="album_name" value="${music.album_name}" required />
                    </div>
                    <div class="form-group">
                        <label for="genre">Genre</label>
                        <input type="text" id="genre" name="genre" value="${music.genre}" required />
                    </div>
                </div>
                <button type="submit">Update Music</button>
            </form>
        </div>
    `;
}

export default loadUpdateMusicDetailsComponent;

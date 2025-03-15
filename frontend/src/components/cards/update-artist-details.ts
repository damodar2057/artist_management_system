import { IArtist } from "../../common/interfaces/artist.interface";

function loadUpdateArtistDetailsComponent(artist: IArtist) {
    return `
        <div class="update-artist-details-card">
            <h2>Update Artist Details</h2>
            <form id="update-artist-form">
                <div class="field-container">
                    <div class="form-group">
                        <label for="artist-name">Artist Name</label>
                        <input type="text" id="artist-name" name="artist_name" value="${artist.name}" required />
                    </div>
                    <div class="form-group">
                        <label for="dob">Date of Birth</label>
                        <input type="date" id="dob" name="dob" value="${artist.dob}" required />
                    </div>
                    <div class="form-group">
                        <label for="gender">Gender</label>
                        <select id="gender" name="gender" required>
                            <option value="Male" ${artist.gender === 'm' ? 'selected' : ''}>Male</option>
                            <option value="Female" ${artist.gender === 'f' ? 'selected' : ''}>Female</option>
                            <option value="Other" ${artist.gender === 'o' ? 'selected' : ''}>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <textarea id="address" name="address" required>${artist.address}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="albums">Albums</label>
                        <input type="number" id="albums" name="albums" value="${artist.no_of_albums_released}" required />
                    </div>
                </div>
                <button type="submit">Update Artist</button>
            </form>
        </div>
    `;
}

export default loadUpdateArtistDetailsComponent;

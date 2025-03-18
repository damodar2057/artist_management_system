//

import { UserRoles } from "common/constants/user-role.enum";
import artistApiManager from "../../apis/artist.api";
import { IArtist } from "../../common/interfaces/artist.interface";



const CreateMusicForm = async (userRole: UserRoles) => {
    // const currentUser = (await )// todo
    const artists: IArtist[] = (await artistApiManager.fetchArtists({page:1, pageSize: 5})).data as IArtist[]
    return `
        <div class="create-music-container">
            <div class="text">
                Create Music
            </div>
            <form action="#">
                <!-- Title Field -->
                <div class="form-row">
                    <div class="input-data">
                    <label for="musicTitle">Title</label>
                        <input type="text" id="musicTitle" required>
                    </div>
                </div>

                <!-- Album Name Field -->
                <div class="form-row">
                    <div class="input-data">
                    <label for="albumName">Album Name</label>
                        <input type="text" id="albumName" required>
                    </div>
                </div>

                <!-- Genre Field -->
                <div class="form-row">
                    <div class="input-data">
                    <label for="musicGenre">Genre</label>
                        <select id="musicGenre" required>
                            <option value="mb">MB</option>
                            <option value="country">Country</option>
                            <option value="classic">Classic</option>
                            <option value="rock">Rock</option>
                            <option value="jazz">Jazz</option>
                        </select>
                    </div>
                </div>

                <!-- Artist ID Field -->
                <div class="form-row">
                    <div class="input-data">
                    <label for="artistID">Artist</label>
                        <select  type="text" id="artistID" required>
                        ${artists.map((artist) => {
                return `<option value="${artist.id}">${artist.name}</option>`;
                }).join('')}
                        </select>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="form-row submit-btn">
                    <div class="input-data">
                        <div class="inner"></div>
                        <button type="submit"  value="Submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    `;
};

export { CreateMusicForm };

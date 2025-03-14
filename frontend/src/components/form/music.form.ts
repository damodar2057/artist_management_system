//



const CreateMusicForm = () => {
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
                        <input type="date" id="albumName" required>
                    </div>
                </div>

                <!-- Genre Field -->
                <div class="form-row">
                    <div class="input-data">
                    <label for="musicGenre">Genre</label>
                        <select id="musicGenre" required>
                            <option value="pop">Pop</option>
                            <option value="rock">Rock</option>
                            <option value="hip-hop">Hip-Hop</option>
                            <option value="jazz">Jazz</option>
                            <option value="classical">Classical</option>
                        </select>
                    </div>
                </div>

                <!-- Artist ID Field -->
                <div class="form-row">
                    <div class="input-data">
                    <label for="artistID">Artist</label>
                        <input type="text" id="artistID" required>
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

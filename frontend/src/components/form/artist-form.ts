//

const CreateArtistForm = () => {
    return `
        <div class="create-artist-container">
            <div class="text">
                Create Artist
            </div>
            <form action="#">
                <!-- Name Field -->
                <div class="form-row">
                    <div class="input-data">
                    <label for="artistName">Name</label>
                        <input type="text" id="artistName" required>
                    </div>
                </div>

                <!-- Date of Birth Field -->
                <div class="form-row">
                    <div class="input-data">
                    <label for="artistDob">Date of Birth</label>
                        <input type="date" id="artistDob" required>
                    </div>
                </div>

                <!-- Gender Field -->
                <div class="form-row">
                    <div class="input-data">
                    <label for="artistGender">Gender</label>
                        <select id="artistGender" required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <!-- Address Field -->
                <div class="form-row">
                    <div class="input-data">
                    <label for="artistAddress">Address</label>
                        <input type="text" id="artistAddress" required>
                    </div>
                </div>

                <!-- First Release Year Field (Optional) -->
                <div class="form-row">
                    <div class="input-data">
                    <label for="firstReleaseYear">First Release Year (Optional)</label>
                        <input type="number" id="firstReleaseYear">
                    </div>
                </div>

                <!-- Number of Albums Released -->
                <div class="form-row">
                    <div class="input-data">
                    <label for="noOfAlbums">Number of Albums Released</label>
                        <input type="number" id="noOfAlbums" required>
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

export { CreateArtistForm };

import toastComponent from "../components/toast/toastComponent";
import musicApiManager from "../apis/music.api";
import { ICreateMusic } from "../common/interfaces/music.interface";
import { Genre } from "../common/constants/genre.enum";
import { clearErrors, showError } from "../utils/validation.util";

function attachMusicFormListener() {
    const musicCreateForm = document.querySelector(".create-music-container form") as HTMLFormElement;

    if (!musicCreateForm) return;

    musicCreateForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Get the form values
        const titleInput = musicCreateForm.querySelector("#musicTitle") as HTMLInputElement;
        const albumInput = musicCreateForm.querySelector("#albumName") as HTMLInputElement;
        const genreInput = musicCreateForm.querySelector("#musicGenre") as HTMLInputElement;
        const artistIdInput = musicCreateForm.querySelector("#artistID") as HTMLInputElement;

        // Clear previous errors
        clearErrors(musicCreateForm);

        let isValid = true;

        if (!titleInput.value.trim()) {
            showError(titleInput, "Title is required.");
            isValid = false;
        }

        if (!albumInput.value.trim()) {
            showError(albumInput, "Album name is required.");
            isValid = false;
        }

        if (!genreInput.value.trim()) {
            showError(genreInput, "Genre is required.");
            isValid = false;
        }

        if (!artistIdInput.value.trim()) {
            showError(artistIdInput, "Artist ID is required.");
            isValid = false;
        }

        // Stop submission if validation fails
        if (!isValid) return;

        // Construct payload
        const payload: ICreateMusic = {
            title: titleInput.value,
            album_name: albumInput.value,
            genre: genreInput.value as Genre,
            artist_id: artistIdInput.value,
        };

        console.log(payload);

        try {
            await musicApiManager.createMusic(payload);
            musicCreateForm.reset();
            toastComponent("Music created successfully!", "success");
        } catch (error: any) {
            console.error(`Failed to create music: ${error}`);
            toastComponent(error.message || "An error occurred", "error");
        }
    });
}

export default attachMusicFormListener;

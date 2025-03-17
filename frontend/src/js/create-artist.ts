import { ICreateArtist } from "../common/interfaces/artist.interface";
import artistApiManager from "../apis/artist.api";
import { Gender } from "../common/constants/gender.enum";
import toastComponent from "../components/toast/toastComponent";
import { clearErrors, showError } from "../utils/validation.util";

function attachArtistFormListener() {
    const artistCreateForm = document.querySelector(".create-artist-container form") as HTMLFormElement;

    if (!artistCreateForm) return;

    artistCreateForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Get input elements
        const nameInput = artistCreateForm.querySelector("#artistName") as HTMLInputElement;
        const dobInput = artistCreateForm.querySelector("#artistDob") as HTMLInputElement;
        const genderInput = artistCreateForm.querySelector("#artistGender") as HTMLSelectElement;
        const addressInput = artistCreateForm.querySelector("#artistAddress") as HTMLInputElement;
        const releaseYearInput = artistCreateForm.querySelector("#firstReleaseYear") as HTMLInputElement;
        const albumsInput = artistCreateForm.querySelector("#noOfAlbums") as HTMLInputElement;

        console.log(genderInput.value)
        console.log(genderInput.value)
        console.log(genderInput.value)
        console.log(genderInput.value)

        // Clear previous errors
        clearErrors(artistCreateForm);

        let isValid = true;

        if (!nameInput.value.trim()) {
            showError(nameInput, "Artist name is required.");
            isValid = false;
        }

        if (!dobInput.value.trim()) {
            showError(dobInput, "Date of birth is required.");
            isValid = false;
        } else if (isNaN(Date.parse(dobInput.value))) {
            showError(dobInput, "Invalid date format.");
            isValid = false;
        }

        if (!genderInput.value.trim() || !(genderInput.value as Gender)) {
            showError(genderInput as unknown as HTMLInputElement, "Select a valid gender.");
            isValid = false;
        }

        if (!addressInput.value.trim()) {
            showError(addressInput, "Address is required.");
            isValid = false;
        }

        const firstReleaseYear = parseInt(releaseYearInput.value, 10);
        if (!releaseYearInput.value.trim() || isNaN(firstReleaseYear) || firstReleaseYear < 1900) {
            showError(releaseYearInput, "Enter a valid release year (>= 1900).");
            isValid = false;
        }

        const noOfAlbums = parseInt(albumsInput.value, 10);
        if (!albumsInput.value.trim() || isNaN(noOfAlbums) || noOfAlbums < 0) {
            showError(albumsInput, "Enter a valid number of albums.");
            isValid = false;
        }

        // Stop submission if validation fails
        if (!isValid) return;

        // Create payload
        const payload: ICreateArtist = {
            name: nameInput.value.trim(),
            dob: new Date(dobInput.value),
            gender: genderInput.value as Gender,
            address: addressInput.value.trim(),
            first_release_year: firstReleaseYear,
            no_of_albums_released: noOfAlbums,
        };

        console.log(payload);

        try {
            await artistApiManager.createArtist(payload);
            artistCreateForm.reset();
            toastComponent("Artist created successfully!", "success");
        } catch (error: any) {
            console.error(`Failed to create artist: ${error}`);
            toastComponent(error.message || "An error occurred", "error");
        }
    });
}

export default attachArtistFormListener;

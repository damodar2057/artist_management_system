//

import { postArtist } from "../utils/api";


function attachArtistFormListener() {
    const artistCreateForm = document.querySelector(".create-artist-container form") as HTMLFormElement;

    if (artistCreateForm) {
        artistCreateForm.addEventListener('click', async (event) => {
            event.preventDefault();


            // Get the form values
            const artistName = (document.getElementById("artistName") as HTMLInputElement).value;
            const artistDob = (document.getElementById("artistDob") as HTMLInputElement).value;
            const artistGender = (document.getElementById("artistGender") as HTMLInputElement).value;
            const artistAddress = (document.getElementById("artistAddress") as HTMLInputElement).value;
            const firstReleaseYear = (document.getElementById("firstReleaseYear") as HTMLInputElement).value;
            const noOfAlbums = (document.getElementById("noOfAlbums") as HTMLInputElement).value;


            const payload = { artistName, artistDob, artistGender, artistAddress, firstReleaseYear, noOfAlbums }
            console.log(payload)
            // todo validate inputs


            try {
                await postArtist(payload);
                artistCreateForm.reset()
            } catch (error) {
                console.error(`Failed to create music:: ${error} `)
            }
        })
    }
}

export default attachArtistFormListener
//



function attachMusicFormListener() {
    const musicCreateForm = document.querySelector(".create-music-container form") as HTMLFormElement;

    if (musicCreateForm) {
        musicCreateForm.addEventListener('click', async (event) => {
            event.preventDefault();


            // Get the form values
            const title = document.getElementById("musicTitle") as HTMLInputElement;
            const albumName = document.getElementById("albumName") as HTMLInputElement;
            const genre = document.getElementById("musicGenre") as HTMLInputElement;
            const artistId = document.getElementById("artistID") as HTMLInputElement;


            const payload = { title, albumName, genre, artistId }
            console.log(payload)

            // todo validate inputs


            // try {
            //     await postMusic(payload)
            //     musicCreateForm.reset()
            // } catch (error) {
            //     console.error(`Failed to create music:: ${error} `)
            // }
        })
    }
}

export default attachMusicFormListener
//  

import getUsersTableHtml from "../components/tables/user-table";
import getLoaderHtml from "../components/loader/loader";
import CreateUserForm from "../components/form/user-form";
import { CreateArtistForm } from "../components/form/artist-form";
import { CreateMusicForm } from "../components/form/music.form";
import getMusicsTableHtml from "../components/tables/music.table";
import { getArtistsTable } from "../components/tables/artist.table";
import { setActiveLink } from "../utils/dom";
import attachUserFormListener from "./create-user";
import attachArtistFormListener from "./create-artist";
import attachMusicFormListener from "./create-music";
import userApiManager from "../apis/user.api";
import { loadUserDetailsCard } from "../components/cards/user-details";
import loadUpdateUserDetailsComponent from "../components/cards/update-user-details";
import artistApiManager from "../apis/artist.api";
import musicApiManager from "../apis/music.api";
import { IResponse } from "../common/interfaces/response.interface";
// import { IErrorMessage } from "common/interfaces/error-response.interface";
import toastComponent from "../components/toast/toastComponent";
import loadUpdateArtistDetailsComponent from "../components/cards/update-artist-details";
import loadUpdateMusicDetailsComponent from "../components/cards/update-music-details";
import { loadArtistDetailsCard } from "../components/cards/artist-details";
import { loadMusicDetailsCard } from "../components/cards/music-details";

// DOM Elements
const usersLink = document.getElementById("users-link") as HTMLAnchorElement;
const artistsLink = document.getElementById("artists-link") as HTMLAnchorElement;
const musicLink = document.getElementById("musics-link") as HTMLAnchorElement;
const createRecButton = document.getElementById("createRecButton") as HTMLButtonElement;
const contentContainer = document.getElementById("content") as HTMLElement;
const breadcrumbElement = document.getElementById("breadcrumbText") as HTMLParagraphElement;
const goBackButton = document.querySelector(".goBackButton button") as HTMLButtonElement;


// Utility functions
function updateContent(content: string) {
    contentContainer.innerHTML = content;
}

function setBreadCrumb(activeLink: HTMLAnchorElement) {
    breadcrumbElement.innerHTML = activeLink?.textContent as string
}

// Fetch and Load Data on Page Load
window.onload = async () => {
    setActiveLink(usersLink)
    setBreadCrumb(usersLink)
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        window.location.href = "login.html"; // Redirect if not logged in
    }

    contentContainer.innerHTML = getLoaderHtml();

    try {
        const res: IResponse<any> = (await userApiManager.fetchUsersData());

        if (res.data) {
            updateContent(getUsersTableHtml(res.data));
            attachGetUserByIdListener()
            attachUpdateBtnListener()
            attachDeleteBtnListener()

        }
    } catch (error) {
        console.error("Error fetching data:", error);
        contentContainer.innerHTML = "<p>Failed to load data.</p>";
    }
};

// Event Listeners for Navigation Links
usersLink.addEventListener("click", async () => {
    contentContainer.innerHTML = getLoaderHtml();
    const res: IResponse<any> = (await userApiManager.fetchUsersData());
    if (res.data) {
        updateContent(getUsersTableHtml(res.data));
        attachGetUserByIdListener()
        attachUpdateBtnListener()
        attachDeleteBtnListener()

    }
    setActiveLink(usersLink);
    setBreadCrumb(usersLink)

});

artistsLink.addEventListener("click", async () => {
    contentContainer.innerHTML = getLoaderHtml();
    try {
        const res: IResponse<any> = await artistApiManager.fetchArtists();
        if (res?.data) {
            updateContent(getArtistsTable(res.data));
            toastComponent(`${res.message}`, 'success');
            attachGetArtistByIdListener()
        }
    } catch (error: any) {
        toastComponent(error.message, 'error')

    }
    setActiveLink(artistsLink);
    setBreadCrumb(artistsLink)

});

musicLink.addEventListener("click", async () => {
    contentContainer.innerHTML = getLoaderHtml();
    try {
        const res: IResponse<any> = await musicApiManager.fetchMusic();
        if (res.data) {
            updateContent(getMusicsTableHtml(res.data));
            toastComponent(`${res.message}`, 'success');
            attachGetMusicByIdListener()
        }
    } catch (error: any) {
        toastComponent(error.message, 'error')
    }
    setActiveLink(musicLink);
    setBreadCrumb(musicLink)

});

// Event Listener for Create Button 
createRecButton.addEventListener("click", () => {
    // createButton.style.display = "none"; // Hides the button
    if (usersLink.classList.contains("active")) {
        updateContent(CreateUserForm());
        attachUserFormListener(); // as we are inserting form after DOM is loaded
    } else if (artistsLink.classList.contains("active")) {
        updateContent(CreateArtistForm());
        attachArtistFormListener()
    } else if (musicLink.classList.contains("active")) {
        updateContent(CreateMusicForm());
        attachMusicFormListener()
    }

});

// Event listener for go back button
goBackButton.addEventListener('click', (ev) => {
    ev.preventDefault();

    // Get the currently active link
    let currentActiveLink: HTMLAnchorElement | null = null;

    if (usersLink.classList.contains('active')) {
        currentActiveLink = usersLink;
    } else if (artistsLink.classList.contains('active')) {
        currentActiveLink = artistsLink;
    } else if (musicLink.classList.contains('active')) {
        currentActiveLink = musicLink;
    }

    if (currentActiveLink) {
        // Set the active link and breadcrumb
        setActiveLink(currentActiveLink);
        setBreadCrumb(currentActiveLink);
    }
});




// Find record by id
function attachGetUserByIdListener() {
    const userIdCells = document.querySelectorAll("#user-table tbody tr td a") as NodeListOf<HTMLAnchorElement>;

    userIdCells.forEach(userIdCell => {
        userIdCell.addEventListener('click', async (ev) => {
            ev.preventDefault()
            const currentRecId = userIdCell.innerHTML;
            contentContainer.innerHTML = getLoaderHtml();
            try {

                const user: IResponse<any> = await userApiManager.getUserById(currentRecId) as IResponse<any>

                if (user?.data) {
                    contentContainer.innerHTML = loadUserDetailsCard(user?.data)
                    goBackButton.style = 'block'
                }
            } catch (error: any) {
                toastComponent(error.message, 'error')

            }
        })
    })
}
// Find artist by id
function attachGetArtistByIdListener() {
    const artistIdCells = document.querySelectorAll("#artist-table tbody tr td a") as NodeListOf<HTMLAnchorElement>;

    artistIdCells.forEach(artistIdCell => {
        artistIdCell.addEventListener('click', async (ev) => {
            ev.preventDefault()
            const currentRecId = artistIdCell.innerHTML;
            contentContainer.innerHTML = getLoaderHtml();

            try {
                const res: IResponse<any> = await artistApiManager.getArtistById(currentRecId) as IResponse<any>

                if (res?.data) {
                    contentContainer.innerHTML = loadArtistDetailsCard(res?.data)
                    goBackButton.style = 'block'
                }
            } catch (error: any) {
                toastComponent(error.message, 'error')
            }
        })
    })
}
// Find music by id
function attachGetMusicByIdListener() {
    const userIdCells = document.querySelectorAll("#music-table tbody tr td a") as NodeListOf<HTMLAnchorElement>;

    userIdCells.forEach(userIdCell => {
        userIdCell.addEventListener('click', async (ev) => {
            ev.preventDefault()
            const currentRecId = userIdCell.innerHTML;
            contentContainer.innerHTML = getLoaderHtml();

            try {
                const music: IResponse<any> = await musicApiManager.getMusicById(currentRecId) as IResponse<any>

                if (music?.data) {
                    contentContainer.innerHTML = loadMusicDetailsCard(music?.data)
                    goBackButton.style = 'block'
                }
            } catch (error: any) {
                toastComponent(error.message, 'error')

            }
        })
    })
}


// Update user details
function attachUpdateBtnListener() {
    document.querySelectorAll('#user-table .update-btn').forEach(btn => {
        btn.addEventListener('click', async ev => {
            contentContainer.innerHTML = getLoaderHtml();
            ev.preventDefault()
            const userId = (ev.target as HTMLElement).getAttribute('data-id') as string;
            console.log(`Update request user id is ${userId}`)
            const user = (await userApiManager.getUserById(userId))?.data
            contentContainer.innerHTML = loadUpdateUserDetailsComponent(user)
            updateUserListener(userId)
        })
    })

    document.querySelectorAll('#artist-table .update-btn').forEach(btn => {
        btn.addEventListener('click', async ev => {
            contentContainer.innerHTML = getLoaderHtml();
            ev.preventDefault()
            const artistId = (ev.target as HTMLElement).getAttribute('data-id') as string;
            console.log(`Update request artist id is ${artistId}`)
            const artist = (await artistApiManager.getArtistById(artistId))?.data
            contentContainer.innerHTML = loadUpdateArtistDetailsComponent(artist)
            updateArtistListener(artistId)
        })
    })

    document.querySelectorAll('#music-table .update-btn').forEach(btn => {
        btn.addEventListener('click', async ev => {
            contentContainer.innerHTML = getLoaderHtml();
            ev.preventDefault()
            const musicId = (ev.target as HTMLElement).getAttribute('data-id') as string;
            console.log(`Update request music id is ${musicId}`)
            const music = (await musicApiManager.getMusicById(musicId))?.data
            contentContainer.innerHTML = loadUpdateMusicDetailsComponent(music)
            updateMusicListener(music)
        })
    })

}



// Update Listeners
function updateArtistListener(artistId: string) {

}
function updateMusicListener(musicId: string) {

}


function updateUserListener(userId: string) {
    const form = document.querySelector("#update-user-form") as HTMLFormElement;

    if (!form) {
        console.warn("Update user form not found.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = {
            firstName: (form.querySelector("#first-name") as HTMLInputElement).value,
            lastName: (form.querySelector("#last-name") as HTMLInputElement).value,
            email: (form.querySelector("#email") as HTMLInputElement).value,
            phone: (form.querySelector("#phone") as HTMLInputElement).value,
            dob: (form.querySelector("#dob") as HTMLInputElement).value,
            role: (form.querySelector("#role") as HTMLInputElement).value,
            gender: (form.querySelector("#gender") as HTMLSelectElement).value,
            address: (form.querySelector("#address") as HTMLTextAreaElement).value
        };

        console.log("User Data:", formData);

        try {
            await userApiManager.updateUser(userId, formData); // Assuming an API call
            alert("User updated successfully!");
        } catch (error) {
            console.error("Failed to update user:", error);
            alert("Error updating user.");
        }
    });
}


// Delete Listeners
function attachDeleteBtnListener() {
    document.querySelectorAll('#user-table .delete-btn').forEach(btn => {
        btn.addEventListener('click', async (ev) => {
            ev.preventDefault()
            contentContainer.innerHTML = getLoaderHtml();
            const userId = (ev.target as HTMLElement).getAttribute('data-id') as string;
            console.log(`Delete request user id is ${userId}`)
            try {

                await userApiManager.deleteUser(userId)
            } catch (error: any) {
                toastComponent(error.message, 'error')
            }
            contentContainer.innerHTML = ''
            usersLink.click() // in this i want to do click event 
        })
    })
    document.querySelectorAll('#artist-table .delete-btn').forEach(btn => {
        btn.addEventListener('click', async (ev) => {
            ev.preventDefault()
            contentContainer.innerHTML = getLoaderHtml();
            const artistId = (ev.target as HTMLElement).getAttribute('data-id') as string;
            console.log(`Delete request artist id is ${artistId}`)
            try {

                await artistApiManager.deleteArtist(artistId)
            } catch (error: any) {
                toastComponent(error.message, 'error')
            }
            contentContainer.innerHTML = ''
            artistsLink.click() // in this i want to do click event 
        })
    })
    document.querySelectorAll('#music-table .delete-btn').forEach(btn => {
        btn.addEventListener('click', async (ev) => {
            ev.preventDefault()
            contentContainer.innerHTML = getLoaderHtml();
            const musicId = (ev.target as HTMLElement).getAttribute('data-id') as string;
            console.log(`Delete request music id is ${musicId}`)
            try {

                await musicApiManager.deleteMusic(musicId)
            } catch (error: any) {
                toastComponent(error.message, 'error')
            }
            contentContainer.innerHTML = ''
            musicLink.click() // in this i want to do click event 
        })
    })

}


// Logout event listener 
document.querySelector(".logout-btn")?.addEventListener('click', (ev) => {
    console.log("Hello from logout button")
    ev.preventDefault()
    localStorage.clear()
    window.location.href = '/src/pages/login.html'
})
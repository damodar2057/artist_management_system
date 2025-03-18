//  

import getUsersTableHtml from "../components/tables/user-table";
import getLoaderHtml from "../components/loader/loader";
import CreateUserForm from "../components/form/user-form";
import { CreateArtistForm } from "../components/form/artist-form";
import { CreateMusicForm } from "../components/form/music.form";
import getMusicsTableHtml from "../components/tables/music.table";
import { getArtistsTable } from "../components/tables/artist.table";
import { loadNavbar, setActiveLink } from "../utils/dom";
import attachUserFormListener from "./create-user";
import attachArtistFormListener from "./create-artist";
import attachMusicFormListener from "./create-music";
import userApiManager from "../apis/user.api";
import { loadUserDetailsCard } from "../components/cards/user-details";
import loadUpdateUserDetailsComponent from "../components/cards/update-user-details";
import artistApiManager from "../apis/artist.api";
import musicApiManager from "../apis/music.api";
import { IResponse } from "../common/interfaces/response.interface";
import toastComponent from "../components/toast/toastComponent";
import loadUpdateArtistDetailsComponent from "../components/cards/update-artist-details";
import loadUpdateMusicDetailsComponent from "../components/cards/update-music-details";
import { loadArtistDetailsCard } from "../components/cards/artist-details";
import { loadMusicDetailsCard } from "../components/cards/music-details";
import { UserRoles } from "../common/constants/user-role.enum";
import { Gender } from "../common/constants/gender.enum";
import { IArtist, IUpdateArtist } from "../common/interfaces/artist.interface";
import { IMusic, IUpdateMusic } from "../common/interfaces/music.interface";
import { Genre } from "../common/constants/genre.enum";
import { getTokenPayload } from "../utils/jwt-decode";
import { IJwtPayload } from "../common/interfaces/jwt.payload";
import { IPaginationResponse } from "../common/interfaces/pagination.interface";
import { renderPagination } from "../components/cards/pagination-component";
import { exportArtistDataToCSV } from "./artist";
import { parseCSVToJson } from "../utils/parse-csv-to-json"
import loadDiscoverSongsTable from "../components/tables/discover-songs";
import loadViewSongsByArtistIdTable from "../components/tables/view-songs-by-artistId";
import { IQueryOptions } from "common/interfaces/query-options";


// DOM Elements
const usersLink = document.getElementById("users-link") as HTMLAnchorElement;
const artistsLink = document.getElementById("artists-link") as HTMLAnchorElement;
const musicLink = document.getElementById("musics-link") as HTMLAnchorElement;
const createRecButton = document.getElementById("createRecButton") as HTMLButtonElement;
const contentContainer = document.getElementById("content") as HTMLElement;
const breadcrumbElement = document.getElementById("breadcrumbText") as HTMLParagraphElement;
const goBackButton = document.querySelector(".goBackButton button") as HTMLButtonElement;
const navbarUsernameElement = document.querySelector(".right-container .navbar #userWelcome") as HTMLSpanElement;
const musicLiElement = document.getElementById('musics-link-id') as HTMLLIElement
const artistLiElement = document.getElementById('artists-link-id') as HTMLLIElement
const userLiElement = document.getElementById('users-link-id') as HTMLLIElement
const recommendedSongsLink = document.getElementById('recommended-songs-link') as HTMLAnchorElement

const decoded: IJwtPayload | null = getTokenPayload()

// Utility functions
function updateContent(content: string) {
    contentContainer.innerHTML = content;
}

function setBreadCrumb(activeLink: HTMLAnchorElement) {
    breadcrumbElement.innerHTML = activeLink?.textContent as string
}

// Fetch and Load Data on Page Load
window.onload = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        window.location.href = "login.html"; // Redirect if not logged in
    }
    loadNavbar(navbarUsernameElement);
    contentContainer.innerHTML = getLoaderHtml();

    if (!decoded) {
        // show the loader in whole page
    }

    switch (decoded?.role) {
        case UserRoles.SUPER_ADMIN:

            musicLiElement.style.display = 'block'
            artistLiElement.style.display = 'block'
            userLiElement.style.display = 'block'

            break
        case UserRoles.ARTIST_MANAGER:
            artistLiElement.style.display = 'block'
            // musicLiElement.style.display = 'block'

            break
        case UserRoles.ARTIST:
            musicLiElement.style.display = 'block'
            break
    }

    loadInitialData()
};

async function loadInitialData() {
    recommendedSongsLink.click()
    setActiveLink(recommendedSongsLink)
    setBreadCrumb(recommendedSongsLink)
}


recommendedSongsLink.addEventListener("click", async (ev) => {
    contentContainer.innerHTML = getLoaderHtml();
    (document.querySelector(".main-content .createRecordBtnContainer") as HTMLDivElement).style.display = 'none'
    await fetchRecommendedSongs(1); // Start from page 1
    setActiveLink(recommendedSongsLink);
    setBreadCrumb(recommendedSongsLink);
});


async function fetchRecommendedSongs(page: number = 1, pageSize: number = 5) {
    try {
        const res: IResponse<any> = await musicApiManager.fetchMusic({page, pageSize}); // Fetch paginated data
        if (res.data && res.data.length > 0) {

            updateContent(loadDiscoverSongsTable(res.data))

            renderPagination("pagination-container", res.pagination as IPaginationResponse, fetchRecommendedSongs);

        }else {
            contentContainer.innerHTML = 'No records found'
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        contentContainer.innerHTML = "<p>Failed to load data.</p>";
    }
}
usersLink.addEventListener("click", async () => {
        contentContainer.innerHTML = getLoaderHtml();
    (document.querySelector(".main-content .createRecordBtnContainer") as HTMLDivElement).style.display = 'flex'
    await fetchAndRenderUsers(1,5); // Start from page 1
    setActiveLink(usersLink);
    setBreadCrumb(usersLink);
});
async function fetchAndRenderUsers(page: number = 1, pageSize: number = 5) {
    const res: IResponse<any> = await userApiManager.fetchUsersData({page, pageSize}); // Fetch paginated data

    if (res.data && res.data.length > 0) {
        updateContent(getUsersTableHtml(res.data));
        attachCreateRecordListener()
        attachGetUserByIdListener();
        attachUpdateBtnListener();
        attachDeleteBtnListener();
        renderPagination("pagination-container", res.pagination as IPaginationResponse, fetchAndRenderUsers);
    }else {
        contentContainer.innerHTML = 'No records found'
    }
}




async function attachExportArtistListener() {
    const exportArtistButton = document.getElementById('export-artist-button') as HTMLButtonElement;
    if (exportArtistButton) {
        exportArtistButton.addEventListener('click', async (ev) => {
            ev.preventDefault();
            // export the records
            const res: IResponse<IArtist[]> = await artistApiManager.fetchExportArtistData(); // Fetch paginated data
            exportArtistDataToCSV('artist', res.data as any[])

        })
    }

}

async function attachImportArtistDataListener() {
    document.getElementById("import-artist-button")?.addEventListener('click', () => {
        const fileInput = document.getElementById("artistCsvInput") as HTMLInputElement;
        fileInput.click()

        fileInput.onchange = async function () {
            if (!fileInput.files || fileInput.files.length === 0) return;

            const file = fileInput.files[0];
            console.log(file);

            const reader = new FileReader();

            reader.onload = async function (e) {
                const csvText = e.target?.result as string;
                console.log(csvText);
                const jsonData = parseCSVToJson(csvText);

                console.log(`Parsed data is::${jsonData}`);

                try {
                    const response = await artistApiManager.postImportArtists(jsonData);
                    if (response.success) {
                        toastComponent("Artists Imported Successfully!!", 'success');
                    }
                    artistsLink.click()
                } catch (error) {
                    toastComponent("Error Importing artists", "error");
                }
            }

            // Start reading the file as text
            reader.readAsText(file);
        }
    })
}

artistsLink.addEventListener("click", async () => {
    contentContainer.innerHTML = getLoaderHtml();
    (document.querySelector(".main-content .createRecordBtnContainer") as HTMLDivElement).style.display = 'flex'
    await fetchAndRenderArtists(1,5); // Start from page 1
    setActiveLink(artistsLink);
    setBreadCrumb(artistsLink);
});
async function fetchAndRenderArtists(page: number = 1, pageSize: number = 5) {
    contentContainer.innerHTML = getLoaderHtml();
    const res: IResponse<any> = await artistApiManager.fetchArtists({page,pageSize}); // Fetch paginated data

    if (res.data && res.data.length > 0) {
        attachCreateRecordListener()
        updateContent(getArtistsTable(res.data));
        attachGetArtistByIdListener();
        attachUpdateBtnListener();
        attachDeleteBtnListener();
        await attachExportArtistListener()
        await attachImportArtistDataListener()
        attachViewArtistSongsListener()
        renderPagination("pagination-container", res.pagination as IPaginationResponse, fetchAndRenderArtists);
    } else {
        contentContainer.innerHTML = 'No records found'
    }
}


musicLink.addEventListener("click", async () => {
    contentContainer.innerHTML = getLoaderHtml();
    (document.querySelector(".main-content .createRecordBtnContainer") as HTMLDivElement).style.display = 'flex'
    await fetchAndRenderMusic(1); // Fetch and render music
    setActiveLink(musicLink);
    setBreadCrumb(musicLink);
});

async function fetchAndRenderMusic(page: number = 1, pageSize: number = 5) {
    contentContainer.innerHTML = getLoaderHtml();
    const res: IResponse<any> = await musicApiManager.fetchMusic({page, pageSize}); // Fetch music data

    if (res.data && res.data.length > 0) {
        attachCreateRecordListener();
        updateContent(getMusicsTableHtml(res.data));
        attachGetMusicByIdListener();
        attachUpdateBtnListener();
        attachDeleteBtnListener();
        renderPagination("pagination-container", res.pagination as IPaginationResponse, fetchAndRenderMusic);

    }else {
        contentContainer.innerHTML = 'No records found'
    }
}


// Event Listener for Create Button
function attachCreateRecordListener() {

    createRecButton.addEventListener("click", async () => {
        // createButton.style.display = "none"; // Hides the button
        if (usersLink.classList.contains("active")) {
            updateContent(CreateUserForm());
            attachUserFormListener(); // as we are inserting form after DOM is loaded
        } else if (artistsLink.classList.contains("active")) {
            updateContent(CreateArtistForm());
            attachArtistFormListener()
        } else if (musicLink.classList.contains("active")) {
            updateContent(await CreateMusicForm(decoded?.role as UserRoles));
            attachMusicFormListener()
        }
        
    });
}

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
            updateMusicListener(musicId)
        })
    })

}



// Update Listeners
function updateArtistListener(artistId: string) {
    const form = document.querySelector("#update-artist-form") as HTMLFormElement;

    if (!form) {
        console.warn("Update artist form not found.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const formData: IUpdateArtist = {
            name: (form.querySelector("#artist-name") as HTMLInputElement).value,
            dob: new Date((form.querySelector("#dob") as HTMLInputElement).value),
            gender: (form.querySelector("#gender") as HTMLInputElement).value as Gender,
            address: (form.querySelector("#address") as HTMLInputElement).value,
            first_release_year: +(form.querySelector("#firstReleaseYear") as HTMLInputElement).value,
            no_of_albums_released: +(form.querySelector("#albums") as HTMLInputElement).value,

        };

        console.log("User Data:", formData);

        try {
            await artistApiManager.updateArtist(artistId, formData); // Assuming an API call
            toastComponent("Artist updated successfully!", "success");
            artistsLink.click()
        } catch (error) {
            console.error("Failed to update artist:", error);
            toastComponent("Error updating artist.", 'error');
        }
    });
}
function updateMusicListener(musicId: string) {
    const form = document.querySelector("#update-music-form") as HTMLFormElement;

    if (!form) {
        console.warn("Update artist form not found.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const formData: IUpdateMusic = {
            title: (form.querySelector(".update-music-details-card form #title") as HTMLInputElement).value,
            album_name: (form.querySelector(".update-music-details-card form  #album_name") as HTMLInputElement).value,
            genre: (form.querySelector(".update-music-details-card form  #genre") as HTMLInputElement).value as Genre,
            artist_id: (form.querySelector(".update-music-details-card form #artist") as HTMLInputElement).value,

        };

        console.log("User Data:", formData);

        try {
            await musicApiManager.updateMusic(musicId, formData); // Assuming an API call
            toastComponent("Music updated successfully!", "success");
            musicLink.click()
        } catch (error: any) {
            console.error("Failed to update music:", error);
            toastComponent(`Error: ${error.message}`);
        }
    });
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
            await userApiManager.updateUser(userId, {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                dob: formData.dob,
                role: formData.role as UserRoles,
                gender: formData.gender as Gender,
                address: formData.address
            }); // Assuming an API call
            toastComponent("User updated successfully!", "success");
            usersLink.click()
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
            console.log("Delete btn for music is called")
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


function attachViewArtistSongsListener(){
    document.querySelectorAll('#artist-table .list-artist-songs-btn').forEach(btn => {
        btn.addEventListener('click', async (ev) => {
            console.log("View song btn for artist is called")
            console.log("View song btn for artist is called")
            console.log("View song btn for artist is called")
            ev.preventDefault()
            contentContainer.innerHTML = getLoaderHtml();
            const artistId = (ev.target as HTMLElement).getAttribute('data-id') as string;
            try {

                const res: IResponse<IMusic[]> = await musicApiManager.getMusicsByArtistId(artistId) as IResponse<IMusic[]>
                console.log(res.data);
                if (res?.data) {
                    contentContainer.innerHTML = loadViewSongsByArtistIdTable(res.data)
                    goBackButton.style = 'block'
                }
            } catch (error: any) {
                toastComponent(error.message, 'error')
            }
            // contentContainer.innerHTML = ''
            // artistsLink.click() // in this i want to do click event 
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
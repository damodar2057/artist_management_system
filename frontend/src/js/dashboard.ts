import getUsersTableHtml from "../components/tables/user-table";
import { fetchUsersData, fetchArtistsData, fetchMusicsData, postUser } from "../utils/api";
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

// DOM Elements
const usersLink = document.getElementById("users-link") as HTMLAnchorElement;
const artistsLink = document.getElementById("artists-link") as HTMLAnchorElement;
const musicLink = document.getElementById("musics-link") as HTMLAnchorElement;
const createRecButton = document.getElementById("createRecButton") as HTMLButtonElement;
const contentContainer = document.getElementById("content") as HTMLElement;
const breadcrumbElement = document.getElementById("breadcrumbText") as HTMLParagraphElement;


// Utility functions
function updateContent(content: string) {
    contentContainer.innerHTML = content;
}

function setBreadCrumb(activeLink: HTMLAnchorElement){
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
        const usersData = await fetchUsersData()

        if (usersData) {
            updateContent(getUsersTableHtml(usersData));
            
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        contentContainer.innerHTML = "<p>Failed to load data.</p>";
    }
};

// Event Listeners for Navigation Links
usersLink.addEventListener("click", async () => {
    contentContainer.innerHTML = getLoaderHtml();
    const usersData = await fetchUsersData();
    if (usersData) {
        updateContent(getUsersTableHtml(usersData));
    }
    setActiveLink(usersLink);
    setBreadCrumb(usersLink)

});

artistsLink.addEventListener("click", async () => {
    contentContainer.innerHTML = getLoaderHtml();
    const artistsData = await fetchArtistsData();
    if (artistsData) {
        updateContent(getArtistsTable(artistsData));
    }
    setActiveLink(artistsLink);
    setBreadCrumb(artistsLink)

});

musicLink.addEventListener("click", async () => {
    contentContainer.innerHTML = getLoaderHtml();
    const musicsData = await fetchMusicsData();
    if (musicsData) {
        updateContent(getMusicsTableHtml(musicsData));
    }
    setActiveLink(musicLink);
    setBreadCrumb(musicLink)

});

// Event Listener for Create Button - Shows the Correct Form
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

// }

//

import { IUser } from "common/interfaces/user.interface";
import appConfig from "../config/app.config";

async function fetchUsersData(): Promise<IUser[] | null> {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            throw new Error("No access token found. Please log in again.");
        }

        const response = await fetch(`${appConfig.serverUrl}user`, {
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error(`Failed to fetch the data. Status: ${response.status}`);
        }

        return await response.json(); // Parse the response body as JSON
    } catch (error) {
        console.error('Fetch Error:', error);
        return null;
    }
}


async function fetchMusicsData(): Promise<any[] | null> {
    try {
        const response = await fetch(`${appConfig.serverUrl}music`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error(`Failed to fetch the music data. Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch Music Error:', error);
        return null;
    }
}

async function fetchArtistsData(): Promise<any[] | null> {
    try {
        const response = await fetch(`${appConfig.serverUrl}artists`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error(`Failed to fetch the artists data. Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch Artists Error:', error);
        return null;
    }
}

async function postUser(payload: any) {
    try {
        const response = await fetch(`${appConfig.serverUrl}user`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(payload)
        });

        if (response.status !== 200) {
            throw new Error(`Failed to fetch the artists data. Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('User Creation Error', error);
        return null;
    }    
}

async function postArtist(payload: any) {
    try {
        const response = await fetch(`${appConfig.serverUrl}artist`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(payload)
        });

        if (response.status !== 200) {
            throw new Error(`Failed to fetch the artists data. Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Artists Creation Error:', error);
        return null;
    }    
}

async function postMusic(payload: any) {
    try {
        const response = await fetch(`${appConfig.serverUrl}music`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(payload)
        });

        if (response.status !== 200) {
            throw new Error(`Failed to fetch the artists data. Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Music Creation Error:', error);
        return null;
    }    
}


export {
    fetchUsersData,
    fetchArtistsData,
    fetchMusicsData,
    postUser,
    postArtist,
    postMusic
}
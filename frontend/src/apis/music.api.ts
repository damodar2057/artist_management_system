//

import { IErrorMessage } from "common/interfaces/error-response.interface";
import { IResponse } from "../common/interfaces/response.interface";
import appConfig from "../config/app.config";
import { IUpdateMusic } from "common/interfaces/music.interface";


const musicApiManager = {
    // GET music by ID
    getMusicById: async (id: string): Promise<IResponse<any> | null> => {
        try {
            const response = await fetch(`${appConfig.serverUrl}music/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`

                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch music. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw error
        }
    },
    // GET musics by artist id
    getMusicsByArtistId: async (artist_id: string): Promise<IResponse<any> | null> => {
        try {
            const response = await fetch(`${appConfig.serverUrl}music/${artist_id}/songs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`

                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch musics by artist id. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw error
        }
    },

    // GET all music
    fetchMusic: async (page: number = 1) => {
        try {
            const response = await fetch(`${appConfig.serverUrl}music?page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`

                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch music. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error: any) {
            throw error
        }
    },

    // POST create music
    createMusic: async (musicData: object) => {
        try {
            const response = await fetch(`${appConfig.serverUrl}music`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`

                },
                body: JSON.stringify(musicData)
            });

            if (!response.ok) {
                throw new Error(`Failed to create music. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error creating music: ${error}`);
            throw error
        }
    },

    // PUT update music
    updateMusic: async (id: string, musicData: IUpdateMusic) => {
        try {
            const response = await fetch(`${appConfig.serverUrl}music/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`

                },
                body: JSON.stringify(musicData)
            });

            if (!response.ok) {
                throw new Error(`Failed to update music. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error updating music: ${error}`);
            throw error
        }
    },

    // DELETE music
    deleteMusic: async (id: string) => {
        try {
            const response = await fetch(`${appConfig.serverUrl}music/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`

                }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete music. Status: ${response.status}`);
            }

            return { message: "Music deleted successfully" };
        } catch (error) {
            console.error(`Error deleting music: ${error}`);
            throw error
        }
    }
};

export default musicApiManager;

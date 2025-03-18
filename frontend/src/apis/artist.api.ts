//


import { IQueryOptions } from "common/interfaces/query-options";
import { ICreateArtist, IUpdateArtist } from "../common/interfaces/artist.interface";
import { IResponse } from "../common/interfaces/response.interface";
import appConfig from "../config/app.config";

const artistApiManager = {
    // GET artist by ID
    getArtistById: async (id: string): Promise<IResponse<any> | null> => {
        try {
            const response = await fetch(`${appConfig.serverUrl}artist/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch artist. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw error
        }
    },

    // GET all artists
    fetchArtists: async (query: IQueryOptions) => {
        try {
            const response = await fetch(`${appConfig.serverUrl}artist?page=${query?.page || 1}&pageSize=${query?.pageSize || 5}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`

                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch artists. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error fetching artists: ${error}`);
            throw error
        }
    },

    fetchExportArtistData: async () => {
        try {
            const response = await fetch(`${appConfig.serverUrl}artist?page=1&pageSize=1000000`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`

                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch artists. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error fetching export artists data: ${error}`)
            throw error
        }
    },

    // POST create artist
    createArtist: async (artistData: ICreateArtist) => {
        try {
            const response = await fetch(`${appConfig.serverUrl}artist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(artistData)
            });

            if (!response.ok) {
                throw new Error(`Failed to create artist. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error creating artist: ${error}`);
            throw error
        }
    },

    // POST create artist
    postImportArtists: async (artistData: any) => {
        try {
            console.log(artistData)
            const response = await fetch(`${appConfig.serverUrl}artist/import`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    
                },
                body: JSON.stringify(artistData)
            });

            if (!response.ok) {
                throw new Error(`Failed to create artist. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error creating artist: ${error}`);
            throw error
        }
    },

    // PUT update artist
    updateArtist: async (id: string, artistData: IUpdateArtist) => {
        try {
            const response = await fetch(`${appConfig.serverUrl}artist/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(artistData)
            });

            if (!response.ok) {
                throw new Error(`Failed to update artist. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error updating artist: ${error}`);
            throw error
        }
    },

    // DELETE artist
    deleteArtist: async (id: string) => {
        try {
            const response = await fetch(`${appConfig.serverUrl}artist/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete artist. Status: ${response.status}`);
            }

            return { message: "Artist deleted successfully" };
        } catch (error) {
            console.error(`Error deleting artist: ${error}`);
            throw error
        }
    }
};

export default artistApiManager;

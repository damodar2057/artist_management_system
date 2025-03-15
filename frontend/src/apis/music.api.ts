//

import { IErrorMessage } from "common/interfaces/error-response.interface";
import { IResponse } from "../common/interfaces/response.interface";
import appConfig from "../config/app.config";


const musicApiManager = {
    // GET music by ID
    getMusicById: async (id: string): Promise<IResponse<any> | null> => {
        try {
            const response = await fetch(`${appConfig.serverUrl}music/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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

    // GET all music
    fetchMusic: async () => {
        try {
            const response = await fetch(`${appConfig.serverUrl}music`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
    updateMusic: async (id: string, musicData: object) => {
        try {
            const response = await fetch(`${appConfig.serverUrl}music/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
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

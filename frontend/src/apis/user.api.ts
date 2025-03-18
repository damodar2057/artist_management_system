import { ICreateUser, IUpdateUser } from "common/interfaces/user.interface";
import { IResponse } from "../common/interfaces/response.interface";
import appConfig from "../config/app.config";
import { IQueryOptions } from "../common/interfaces/query-options";

const userApiManager = {
    // GET user by ID
    getUserById: async (id: string): Promise<IResponse<any> | null> => {
        try {
            const response = await fetch(`${appConfig.serverUrl}user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch user. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error fetching user: ${error}`);
            return null;
        }
    },

    // GET all users
    fetchUsersData: async (query: IQueryOptions) => {
        try {
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                throw new Error("No access token found. Please log in again.");
            }

            const response : Response= await fetch(`${appConfig.serverUrl}user?page=${query?.page}&pageSize=${query?.pageSize}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch users. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error fetching users: ${error}`);
            return null;
        }
    },

    // POST create user
    createUser: async (userData: ICreateUser) => {
        try {
            const response = await fetch(`${appConfig.serverUrl}user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(`Failed to create user. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error creating user: ${error}`);
            return null;
        }
    },

    // PUT update user
    updateUser: async (id: string, userData: IUpdateUser) => {
        try {
            const response = await fetch(`${appConfig.serverUrl}user/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(`Failed to update user. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error updating user: ${error}`);
            return null;
        }
    },

    // DELETE user
    deleteUser: async (id: string) => {
        try {

            const response = await fetch(`${appConfig.serverUrl}user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete user. Status: ${response.status}`);
            }

            return { message: "User deleted successfully" };
        } catch (error) {
            console.error(`Error deleting user: ${error}`);
            return null;
        }
    }
};

export default userApiManager;

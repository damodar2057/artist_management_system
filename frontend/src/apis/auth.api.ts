import appConfig from "../config/app.config";
import { ILoginResponse } from "../common/interfaces/response.interface";
import { IRegister } from "common/interfaces/register.interface";

const authApiManager = {
  register: async (payload: IRegister) => {
    try {
      const response = await fetch(`${appConfig.serverUrl}auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Register failed');
      }
      
      return data as ILoginResponse;
    } catch (error) {
      console.error(`Registration unsuccessful: ${error instanceof Error ? error.message : String(error)}`);
      throw error; // Re-throw to allow caller to handle the error
    }
  },
  
  login: async (payload: {username: string, password: string}): Promise<ILoginResponse> => {
    try {
      const response = await fetch(`${appConfig.serverUrl}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      return data as ILoginResponse;
    } catch (error) {
      console.error(`Login unsuccessful: ${error instanceof Error ? error.message : String(error)}`);
      throw error; // Re-throw to allow caller to handle the error
    }
  }
};

export default authApiManager;
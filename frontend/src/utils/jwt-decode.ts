//


import { IJwtPayload } from "common/interfaces/jwt.payload";
import toastComponent from "../components/toast/toastComponent";
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token: string) : boolean{
    if(!token) return true;
    const decodedToken  = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp as number  < currentTime;
}


function getTokenPayload() {
    try {
        const token = localStorage.getItem("accessToken") as string;
        if(token && isTokenExpired(token)){
            toastComponent('Token expired!!','error')
            localStorage.clear()
            window.location.href = "/src/pages/login.html"
            return null;
        }
      const decoded: IJwtPayload= jwtDecode(token); 
      console.log('Decoded Payload:', decoded);
      return decoded; 
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

export {
    isTokenExpired,
    getTokenPayload
}
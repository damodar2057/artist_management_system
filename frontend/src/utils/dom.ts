import { JwtPayload } from "jwt-decode";
import { getTokenPayload } from "./jwt-decode";
import { IJwtPayload } from "../common/interfaces/jwt.payload";

// Utility functions
export function setActiveLink(activeLink: HTMLAnchorElement) {
    const activeComponentLinks = document.querySelectorAll(".menu li a") as NodeListOf<HTMLAnchorElement>;
    activeComponentLinks.forEach((link) => link.classList.remove("active"));
    activeLink.classList.add("active");
}


export function loadNavbar(navbarUsernameElement: HTMLSpanElement) {
    const decodedPayload = getTokenPayload() as IJwtPayload;


    navbarUsernameElement.innerHTML = decodedPayload.first_name

}
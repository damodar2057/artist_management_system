// Utility functions
export function setActiveLink(activeLink: HTMLAnchorElement) {
    const activeComponentLinks = document.querySelectorAll(".menu li a") as NodeListOf<HTMLAnchorElement>;
    activeComponentLinks.forEach((link) => link.classList.remove("active"));
    activeLink.classList.add("active");
}


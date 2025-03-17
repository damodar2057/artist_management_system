//

import { CreateArtistDto } from "src/dtos/artist.dto";



export function isValidArtist(artist: CreateArtistDto): boolean {
    return (
        // Allow name to be a non-empty string or undefined/empty, trimming extra spaces
        typeof artist.name === "string" && artist.name.trim() !== "" &&
        
        // Allow dob to be a valid date or undefined/empty
        (!artist.dob || artist.dob instanceof Date && !isNaN(artist.dob.getTime())) && 
        
        // Gender can be one of the three values (m, f, o), but it's not strictly required
        (!artist.gender || ["m", "f", "o"].includes(artist.gender.toLowerCase())) && 
        
        // Allow address to be a non-empty string or undefined/empty
        typeof artist.address === "string" && artist.address.trim() !== "" &&
        
        // Allow first_release_year to be a number greater than 1900 or undefined
        (typeof artist.first_release_year === "number" && artist.first_release_year >= 1900 || !artist.first_release_year) &&
        
        // Allow no_of_albums_released to be a positive integer or undefined/empty
        (Number.isInteger(artist.no_of_albums_released) && artist.no_of_albums_released >= 0 || !artist.no_of_albums_released)
    );
}

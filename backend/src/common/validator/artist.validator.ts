//

import { Gender } from "../constants/gender.enum";
import { IArtistEntity } from "../interfaces/artist.interface";



function validateArtist(data: Partial<IArtistEntity>): string[] {
    const errors: string[] = [];

    if (!data.name || typeof data.name !== "string" || data.name.length < 3) {
        errors.push("Name must be at least 3 characters long.");
    }

    if (!data.dob || isNaN(new Date(data.dob).getTime())) {
        errors.push("Date of birth must be a valid date.");
    } else if (new Date(data.dob) > new Date()) {
        errors.push("Date of birth cannot be in the future.");
    }

    if (!data.gender || !Object.values(Gender).includes(data.gender)) {
        errors.push(`Gender must be one of: ${Object.values(Gender).join(", ")}`);
    }

    if (!data.address || typeof data.address !== "string" || data.address.trim().length === 0) {
        errors.push("Address is required and must be a valid string.");
    }

    if (
        data.first_release_year !== undefined &&
        (typeof data.first_release_year !== "number" || data.first_release_year > new Date().getFullYear())
    ) {
        errors.push("First release year must be a valid past year.");
    }

    if (!data.no_of_albums_released || data.no_of_albums_released < 0) {
        errors.push("Number of albums released must be a positive number.");
    }

    return errors;
}

export { validateArtist };

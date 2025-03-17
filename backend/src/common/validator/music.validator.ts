//  

import { Genre } from "../constants/genre.enum";
import { IMusicEntity } from "../interfaces/music.interface";

function validateMusic(data: Partial<IMusicEntity>): string[] {
    const errors: string[] = [];

    if (!data.title || typeof data.title !== "string" || data.title.length < 3) {
        errors.push("Title must be at least 3 characters long.");
    }

    if (!data.album_name || isNaN(new Date(data.album_name).getTime())) {
        errors.push("Album name must be a valid date.");
    }

    if (!data.genre || !Object.values(Genre).includes(data.genre)) {
        errors.push(`Genre must be one of: ${Object.values(Genre).join(", ")}`);
    }

    if (!data.artist_id || typeof data.artist_id !== "string") {
        errors.push("Artist ID is required and must be a string.");
    }

    return errors;
}

export { validateMusic };

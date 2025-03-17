//

import { Gender } from "common/constants/gender.enum";
import { ICreateArtist } from "common/interfaces/artist.interface";



export function parseCSVToJson(csvText: string): ICreateArtist[] {
    const rows = csvText.split("\n").map(row => row.trim()).filter(row => row);
    const headers = rows[0].split(",");

    return rows.slice(1).map(row => {
        const values = row.split(",");
        const artist: Partial<ICreateArtist> = {};

        headers.forEach((header, index) => {
            const key = header.trim();
            let rawValue: string = values[index]?.trim();
            console.log(rawValue);

            if (key === "name" || key === "address") {
                rawValue = rawValue.replace(/^"|"$/g, ''); // Remove leading and trailing quotes
            }

            let parsedValue: string | number | Date | Gender = rawValue;

            // Assign values with correct data types
            if (key === "dob") {
                const date = new Date(rawValue);
                if (isNaN(date.getTime())) return null; // Skip invalid date
                parsedValue = date;
            }
            else if (key === "first_release_year" || key === "no_of_albums_released") {
                const numValue = parseInt(rawValue, 10);
                if (isNaN(numValue)) return null; // Skip invalid numbers
                parsedValue = numValue;
            } else if (key === "gender") {
                const genderValue = rawValue.toLowerCase() as Gender;
                if (!["m", "f", "o"].includes(genderValue)) return null; // Skip invalid gender
                parsedValue = genderValue;
            }

            (artist as any)[key] = parsedValue;
        });

        // Ensure all required fields exist before adding to the valid list
        // if (isValidArtist(artist as ICreateArtist)) {
        //     return artist as ICreateArtist;
        // }
        return artist; // Skip invalid records
    }).filter(Boolean) as ICreateArtist[]; // Remove null values (invalid records)
}


function isValidArtist(artist: ICreateArtist): boolean {
    return (
        typeof artist.name === "string" &&
        artist.name.trim() !== "" &&
        artist.dob instanceof Date &&
        !isNaN(artist.dob.getTime()) &&
        ["m", "f", "o"].includes(artist.gender) &&
        typeof artist.address === "string" &&
        artist.address.trim() !== "" &&
        Number.isInteger(artist.first_release_year) &&
        artist.first_release_year > 1900 &&
        Number.isInteger(artist.no_of_albums_released) &&
        artist.no_of_albums_released >= 0
    );
}

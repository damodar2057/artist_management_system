//

import { Request } from "express";
import { NotFoundException } from "src/common/exceptions/notFound.exception";
import { IArtistEntity } from "src/common/interfaces/artist.interface";
import { IPaginatedResult } from "src/common/interfaces/paginated-result.interface";
import { ArtistService } from "src/services/artistService";

export class ArtistController {
    private static instance: ArtistController;
    private readonly artistService: ArtistService;

    private constructor() {
        this.artistService = ArtistService.getInstance();
    }

    public static getInstance() {
        if (!ArtistController.instance) {
            ArtistController.instance = new ArtistController();
        }
        return ArtistController.instance;
    }

        async getArtists(req: Request): Promise<IPaginatedResult<IArtistEntity[]>> {
            try {
                const { page = 1, pageSize = 10, sortBy, sortOrder} = req.query
                const {data, total} =  await this.artistService.fetchAllArtists(req.query);
                return {
                    data: data,
                    pagination: {
                        currentPage: +page,
                        itemsPerPage: +pageSize,
                        totalItems: total,
                        totalPages: Math.ceil(total / +pageSize),
                    }
                }
            } catch (error) {
                throw error;
            }
        }

    async getArtistById(req: Request): Promise<IArtistEntity> {
        try {
            const artist = await this.artistService.fetchArtistById(req.params.id);
            if (!artist) {
                throw new NotFoundException(`Artist with ID ${req.params.id} not found.`);
            }
            return artist;
        } catch (error) {
            throw error;
        }
    }

    async createArtist(req: Request): Promise<IArtistEntity> {
        try {
            return await this.artistService.createArtist(req.body);
        } catch (error) {
            throw error;
        }
    }

    async updateArtist(req: Request): Promise<IArtistEntity> {
        try {
            return await this.artistService.updateArtist(req.params.id, req.body);
        } catch (error) {
            throw error;
        }
    }

    async deleteArtist(req: Request): Promise<{ message: string }> {
        try {
            await this.artistService.deleteArtist(req.params.id);
            return { message: `Artist with ID ${req.params.id} deleted successfully.` };
        } catch (error) {
            throw error;
        }
    }
}

// backend/src/services/artistService.ts


import { NotFoundException } from "src/common/exceptions/notFound.exception";
import { IArtistEntity } from "src/common/interfaces/artist.interface";
import { IPaginationOptions } from "src/common/interfaces/pagination-options.interface";
import { CreateArtistDto } from "src/dtos/artist.dto";
import { ArtistModel } from "src/models/artistModel";

export class ArtistService {
    private static instance: ArtistService;
    private repository: ArtistModel;

    private constructor() {
        this.repository = ArtistModel.getInstance();
    }

    public static getInstance() {
        if (!ArtistService.instance) {
            ArtistService.instance = new ArtistService();
        }
        return ArtistService.instance;
    }

    public async fetchArtistById(artistId: string): Promise<IArtistEntity | null> {
        try {
            const artist = await this.repository.findOne(artistId);
            if (!artist) {
                throw new NotFoundException(`Artist with id ${artistId} not found!`);
            }
            return artist;
        } catch (error) {
            throw error;
        }
    }

    public async fetchAllArtists(options: IPaginationOptions): Promise<{data: IArtistEntity[], total: number}> {
        try {
            return await this.repository.findAll(options);
        } catch (error) {
            throw error;
        }
    }

    public async createArtist(dto: CreateArtistDto): Promise<IArtistEntity | null> {
        try {
            const artist = await this.repository.create(dto);
            return artist;
        } catch (error) {
            throw error;
        }
    }

    public async updateArtist(artistId: string, dto: any): Promise<IArtistEntity | null> {
        try {
            const artist = await this.repository.findOne(artistId);
            if (!artist) {
                throw new NotFoundException(`Artist with id ${artistId} not found!`);
            }

            const updatedArtist = await this.repository.update(artistId, dto);
            return updatedArtist;
        } catch (error) {
            throw error;
        }
    }

    public async deleteArtist(artistId: string): Promise<boolean> {
        try {
            const artist = await this.repository.findOne(artistId);
            if (!artist) {
                throw new NotFoundException(`Artist with id ${artistId} not found!`);
            }

            const result = await this.repository.delete(artistId);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

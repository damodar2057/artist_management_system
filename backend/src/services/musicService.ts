// backend/src/services/musicService.ts


import { BadRequestException } from "src/common/exceptions/badRequest.exception";
import { NotFoundException } from "src/common/exceptions/notFound.exception";
import { IMusicEntity } from "src/common/interfaces/music.interface";
import { IPaginationOptions } from "src/common/interfaces/pagination-options.interface";
import { CreateMusicDto } from "src/dtos/music.dto";
import { ArtistModel } from "src/models/artistModel";
import { MusicModel } from "src/models/musicModel";

export class MusicService {
    private static instance: MusicService;
    private repository: MusicModel;
    private artistRepository: ArtistModel

    private constructor() {
        this.repository = MusicModel.getInstance();
        this.artistRepository = ArtistModel.getInstance();
    }

    public static getInstance() {
        if (!MusicService.instance) {
            MusicService.instance = new MusicService();
        }
        return MusicService.instance;
    }

    public async fetchMusicById(musicId: string): Promise<IMusicEntity | null> {
        try {
            const music = await this.repository.findOne(musicId);
            if (!music) {
                throw new NotFoundException(`Music with id ${musicId} not found!`);
            }
            return music;
        } catch (error) {
            throw error;
        }
    }

    public async fetchAllMusics(options: IPaginationOptions): Promise<{ data: IMusicEntity[], total: number}> {
        try {
            return await this.repository.findAll(options);
        } catch (error) {
            throw error;
        }
    }

    public async createMusic(dto: CreateMusicDto): Promise<IMusicEntity | null> {
        try {

            // first check if the artist id exist or not
            const existingArtist = await  this.artistRepository.findById(dto.artist_id)
            if (!existingArtist){
                throw new BadRequestException(`Artist with id ${dto.artist_id}`)
            }
            const music = await this.repository.create(dto);
            return music;
        } catch (error) {
            throw error;
        }
    }

    public async updateMusic(musicId: string, dto: any): Promise<IMusicEntity | null> {
        try {
            console.log('Music id i got is ', musicId)
            const music = await this.repository.findOne(musicId);
            if (!music) {
                throw new NotFoundException(`Music with id ${musicId} not found!`);
            }

            const updatedMusic = await this.repository.update(musicId, dto);
            return updatedMusic;
        } catch (error) {
            throw error;
        }
    }

    public async deleteMusic(musicId: string): Promise<boolean> {
        try {
            const music = await this.repository.findOne(musicId);
            if (!music) {
                throw new NotFoundException(`Music with id ${musicId} not found!`);
            }

            const result = await this.repository.delete(musicId);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

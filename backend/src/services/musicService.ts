// backend/src/services/musicService.ts


import { NotFoundException } from "src/common/exceptions/notFound.exception";
import { IMusicEntity } from "src/common/interfaces/music.interface";
import { CreateMusicDto } from "src/dtos/music.dto";
import { MusicModel } from "src/models/musicModel";

export class MusicService {
    private static instance: MusicService;
    private repository: MusicModel;

    private constructor() {
        this.repository = MusicModel.getInstance();
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

    public async fetchAllMusics(): Promise<IMusicEntity[]> {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw error;
        }
    }

    public async createMusic(dto: CreateMusicDto): Promise<IMusicEntity | null> {
        try {
            const music = await this.repository.create(dto);
            return music;
        } catch (error) {
            throw error;
        }
    }

    public async updateMusic(musicId: string, dto: any): Promise<IMusicEntity | null> {
        try {
            const music = await this.repository.findOne(musicId);
            if (!music) {
                throw new NotFoundException(`Music with id ${musicId} not found!`);
            }

            const updatedMusic = await this.repository.update(musicId, dto);
            return null;
            // return updatedMusic;
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

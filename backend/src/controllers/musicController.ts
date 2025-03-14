//

import { Request } from "express";
import { NotFoundException } from "src/common/exceptions/notFound.exception";
import { IMusicEntity } from "src/common/interfaces/music.interface";
import { MusicService } from "src/services/musicService";

export class MusicController {
    private static instance: MusicController;
    private readonly musicService: MusicService;

    private constructor() {
        this.musicService = MusicService.getInstance();
    }

    public static getInstance() {
        if (!MusicController.instance) {
            MusicController.instance = new MusicController();
        }
        return MusicController.instance;
    }

    async getMusics(req: Request): Promise<IMusicEntity[]> {
        try {
            return await this.musicService.fetchAllMusics();
        } catch (error) {
            throw error;
        }
    }

    async getMusicById(req: Request): Promise<IMusicEntity> {
        try {
            const music = await this.musicService.fetchMusicById(req.params.id);
            if (!music) {
                throw new NotFoundException(`Music with ID ${req.params.id} not found.`);
            }
            return music;
        } catch (error) {
            throw error;
        }
    }

    async createMusic(req: Request): Promise<IMusicEntity> {
        try {
            return await this.musicService.createMusic(req.body);
        } catch (error) {
            throw error;
        }
    }

    async updateMusic(req: Request): Promise<IMusicEntity> {
        try {
            return await this.musicService.updateMusic(req.params.id, req.body);
        } catch (error) {
            throw error;
        }
    }

    async deleteMusic(req: Request): Promise<{ message: string }> {
        try {
            await this.musicService.deleteMusic(req.params.id);
            return { message: `Music with ID ${req.params.id} deleted successfully.` };
        } catch (error) {
            throw error;
        }
    }
}

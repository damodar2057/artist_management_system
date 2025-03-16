//

import { Request } from "express";
import { Permissions } from "src/common/constants/permissions.enum";
import { PermissionGuard } from "src/common/decorators/permission-guard.decorator";
import { NotFoundException } from "src/common/exceptions/notFound.exception";
import { IMusicEntity } from "src/common/interfaces/music.interface";
import { IPaginatedResult } from "src/common/interfaces/paginated-result.interface";
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

    @PermissionGuard(Permissions.READ_MUSIC_ALL)
    async getMusics(req: Request): Promise<IPaginatedResult<IMusicEntity[]>> {
        try {
            const { page = 1, pageSize = 10, sortBy, sortOrder} = req.query
            const {data, total} =  await this.musicService.fetchAllMusics(req.query);
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

    @PermissionGuard(Permissions.READ_MUSIC_ONE)
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

    @PermissionGuard(Permissions.CREATE_MUSIC)
    async createMusic(req: Request): Promise<IMusicEntity> {
        try {
            return await this.musicService.createMusic(req.body);
        } catch (error) {
            throw error;
        }
    }

    @PermissionGuard(Permissions.UPDATE_MUSIC)
    async updateMusic(req: Request): Promise<IMusicEntity> {
        try {
            return await this.musicService.updateMusic(req.params.id, req.body);
        } catch (error) {
            throw error;
        }
    }

    @PermissionGuard(Permissions.DELETE_MUSIC)
    async deleteMusic(req: Request): Promise<{ message: string }> {
        try {
            await this.musicService.deleteMusic(req.params.id);
            return { message: `Music with ID ${req.params.id} deleted successfully.` };
        } catch (error) {
            throw error;
        }
    }
}

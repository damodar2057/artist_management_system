//

import { Pool } from "pg";
import { DBTables } from "src/common/constants/db-tables.enum";
import { IMusicEntity } from "src/common/interfaces/music.interface";
import { IPaginationOptions } from "src/common/interfaces/pagination-options.interface";
import { QueryOptions } from "src/common/types/query-options.type";
import db from 'src/db'
import { musicQueries } from "src/db/queries/music.query";
import { CreateMusicDto, UpdateMusicDto } from "src/dtos/music.dto";


export class MusicModel {
    private dbConnection: Pool;
    private static instance: MusicModel;  // singleton instance
    private constructor() {
        this.dbConnection = db.getInstance().getPool()
    }

    public static getInstance() {
        if (!MusicModel.instance) {
            MusicModel.instance = new MusicModel();
        }
        return MusicModel.instance;
    }


    async findAll(options: IPaginationOptions): Promise<{ data: IMusicEntity[], total: number }> {
        try {
            const data = (await this.dbConnection.query(musicQueries.findAll(options)))
            return { data: data.rows, total:  (await this.dbConnection.query(`SELECT * FROM ${DBTables.MUSIC}`)).rowCount }
        } catch (error) {
            throw error
        }
    }

    async findAllMusicsByArtistId(options: IPaginationOptions, music_id: string): Promise<{ data: IMusicEntity[], total: number }> {
        try {
            const data = (await this.dbConnection.query(musicQueries.findAllMusicByArtistId(options, music_id)))
            return { data: data.rows, total:  (await this.dbConnection.query(`SELECT * FROM ${DBTables.MUSIC} WHERE music_id=${music_id}`)).rowCount }
        } catch (error) {
            throw error
        }
    }

    async findOne(id: string): Promise<IMusicEntity> {
        try {
            return (await this.dbConnection.query(musicQueries.findOne, [id])).rows[0]
        } catch (error) {
            throw error
        }
    }
    async findById(id: string): Promise<IMusicEntity> {
        try {
            return (await this.dbConnection.query(musicQueries.findOne, [id])).rows[0]
        } catch (error) {
            throw error
        }
    }
    async update(id: string, dto: UpdateMusicDto) {
        try {
            const result = await this.dbConnection.query(musicQueries.update, [
                dto.title || null,
                dto.album_name || null,
                dto.genre || null,
                dto.artist_id || null,
                id

            ])
            return result.rows[0]
        } catch (error) {
            throw error
        }
    }

    async create(dto: CreateMusicDto): Promise<IMusicEntity> {
        try {

            const result = await this.dbConnection.query(musicQueries.create, [
                dto.title,
                dto.album_name,
                dto.genre,
                dto.artist_id,
            ]);

            const newUser = result.rows[0];

            return newUser;
        } catch (error) {
            throw error
        }
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.dbConnection.query(musicQueries.delete, [id]);
        return result.rowCount > 0;
    }



}
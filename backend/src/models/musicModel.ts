//

import { Pool } from "pg";
import { IMusicEntity } from "src/common/interfaces/music.interface";
import db from 'src/db'
import { musicQueries } from "src/db/queries/music.query";
import { CreateMusicDto } from "src/dtos/music.dto";


export class MusicModel {
    private dbConnection: Pool;
    private static instance: MusicModel;  // singleton instance
    private constructor(){
        this.dbConnection = db.getInstance().getPool()
    }
    
    public static getInstance(){
        if(!MusicModel.instance){
            MusicModel.instance  = new MusicModel();
        }
        return MusicModel.instance;
    }
    
    
    async findAll(): Promise<IMusicEntity[]> {
        try {
            return (await this.dbConnection.query(musicQueries.findAll)).rows
        } catch (error) {
            throw error
        }
    }
    
    async findOne(id: string): Promise<IMusicEntity> {
        try {
            return (await this.dbConnection.query(musicQueries.findOne,[id])).rows[0]
        } catch (error) {
            throw error
        }
    }
    async findById(id: string): Promise<IMusicEntity> {
        try {
            return (await this.dbConnection.query(musicQueries.findOne,[id])).rows[0]
        } catch (error) {
            throw error
        }
    }
    async update(id: string, dto: any) {
        try {
            // await (await this.dbConnection.query(musicQueries.update))
        } catch (error) {
            throw error
        }
    }

    async create(dto: CreateMusicDto): Promise<IMusicEntity> {
        try {
            const { album_name,artist_id,genre, title } = dto;

            const result = await this.dbConnection.query(musicQueries.create, [
                album_name, 
                artist_id, 
                genre, 
                title, 
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
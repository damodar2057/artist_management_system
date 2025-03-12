// backend/src/models/artistModel.ts

import { Pool } from "pg";
import { IArtistEntity } from "src/common/interfaces/artist.interface";
import db from 'src/db'
import { artistQueries } from "src/db/queries/artist.query";
import { CreateArtistDto } from "src/dtos/artist.dto";



export class ArtistModel {
    private dbConnection: Pool;
    private static instance: ArtistModel;  // singleton instance
    private constructor(){
        this.dbConnection = db.getInstance().getPool()
    }
    
    public static getInstance(){
        if(!ArtistModel.instance){
            ArtistModel.instance  = new ArtistModel();
        }
        return ArtistModel.instance;
    }
    
    
    async findAll(): Promise<IArtistEntity[]> {
        try {
            return (await this.dbConnection.query(artistQueries.findAll)).rows
        } catch (error) {
            throw error
        }
    }
    
    async findOne(id: string): Promise<IArtistEntity> {
        try {
            return (await this.dbConnection.query(artistQueries.findOne,[id])).rows[0]
        } catch (error) {
            throw error
        }
    }
    async findById(id: string): Promise<IArtistEntity> {
        try {
            return (await this.dbConnection.query(artistQueries.findOne,[id])).rows[0]
        } catch (error) {
            throw error
        }
    }
    async update(id: string, dto: any) {
        try {
            // await (await this.dbConnection.query(artistQueries.update))
        } catch (error) {
            throw error
        }
    }

    async create(dto: CreateArtistDto): Promise<IArtistEntity> {
        try {
           

            const result = await this.dbConnection.query(artistQueries.create, [
                dto.name,
                dto.dob,
                dto.gender,
                dto.address,
                dto.first_release_year,
                dto.no_of_albums_released,
            ]);

            const newUser = result.rows[0];

            return newUser;
        } catch (error) {
            throw error
        }
    }
    async delete(id: string): Promise<boolean> {
        const result = await this.dbConnection.query(artistQueries.delete, [id]);
        return result.rowCount > 0; 
    }



}
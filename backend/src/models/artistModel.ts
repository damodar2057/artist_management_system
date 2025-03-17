// backend/src/models/artistModel.ts

import { Pool } from "pg";
import { DBTables } from "src/common/constants/db-tables.enum";
import { IArtistEntity } from "src/common/interfaces/artist.interface";
import { IPaginationOptions } from "src/common/interfaces/pagination-options.interface";
import db from 'src/db'
import { artistQueries } from "src/db/queries/artist.query";
import { CreateArtistDto, UpdateArtistDto } from "src/dtos/artist.dto";



export class ArtistModel {
    private dbConnection: Pool;
    private static instance: ArtistModel;  // singleton instance
    private constructor() {
        this.dbConnection = db.getInstance().getPool()
    }

    public static getInstance() {
        if (!ArtistModel.instance) {
            ArtistModel.instance = new ArtistModel();
        }
        return ArtistModel.instance;
    }


    async findAll(queryOptions: IPaginationOptions): Promise<{ data: IArtistEntity[], total: number }> {
        try {
            const data = (await this.dbConnection.query(artistQueries.findAll(queryOptions)))
            return { data: data.rows, total: (await this.dbConnection.query(`SELECT * FROM ${DBTables.ARTIST}`)).rowCount }
        } catch (error) {
            throw error
        }
    }

    async findOne(id: string): Promise<IArtistEntity> {
        try {
            return (await this.dbConnection.query(artistQueries.findOne, [id])).rows[0]
        } catch (error) {
            throw error
        }
    }
    async findById(id: string): Promise<IArtistEntity> {
        try {
            return (await this.dbConnection.query(artistQueries.findOne, [id])).rows[0]
        } catch (error) {
            throw error
        }
    }
    async update(id: string, dto: UpdateArtistDto) {
        try {
            const result = await this.dbConnection.query(artistQueries.update, [
                dto.name,
                dto.dob,
                dto.gender,
                dto.address,
                dto.first_release_year,
                dto.no_of_albums_released,
                id
            ])

            return result.rows[0]
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

    async bulkInsertArtists(artists: CreateArtistDto[]) {
        try {
            await this.dbConnection.query('BEGIN')
            const BATCH_SIZE = 100;

            for (let i = 0; i < artists.length; i += BATCH_SIZE) {
                const batch = artists.slice(i, i + BATCH_SIZE)
                const promises = batch.map(artist =>
                    this.dbConnection.query(artistQueries.create, [
                        artist.name,
                        artist.dob,
                        artist.gender,
                        artist.address,
                        artist.first_release_year,
                        artist.no_of_albums_released
                    ])
                )

                await Promise.all(promises)
            }


            await this.dbConnection.query('COMMIT')
            return { message: 'Bulk Insert Success', count: artists.length }

        } catch (error) {
            await this.dbConnection.query('ROLLBACK')
            throw error;

        } finally {
            await this.dbConnection.query('END');
        }

    }


    async delete(id: string): Promise<boolean> {
        const result = await this.dbConnection.query(artistQueries.delete, [id]);
        return result.rowCount > 0;
    }



}
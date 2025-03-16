// backend/src/models/userModels.ts

import { Pool } from "pg";
import { DBTables } from "src/common/constants/db-tables.enum";
import { IPaginationOptions } from "src/common/interfaces/pagination-options.interface";
import { IUserEntity } from "src/common/interfaces/user.interface";
import db from 'src/db'
import { usersQueries } from "src/db/queries/user.query";
import { CreateUserDto, UpdateUserDto } from "src/dtos/user.dto";

interface FindOptionsWhere<T> {

}

export class UserModel {
    private dbConnection: Pool;
    private static instance: UserModel;  // singleton instance
    private constructor() {
        this.dbConnection = db.getInstance().getPool()
    }

    public static getInstance() {
        if (!UserModel.instance) {
            UserModel.instance = new UserModel();
        }
        return UserModel.instance;
    }


    async findAll(options: IPaginationOptions): Promise<{ data: IUserEntity[], total: number }> {
        try {
            const data = (await this.dbConnection.query(usersQueries.findAll(options)))
            return { data: data.rows, total:  (await this.dbConnection.query(`SELECT * FROM ${DBTables.USER}`)).rowCount }
        } catch (error) {
            throw error
        }
    }

    async findOne(id: string): Promise<IUserEntity> {
        try {
            return (await this.dbConnection.query(usersQueries.findOne, [id])).rows[0]
        } catch (error) {
            throw error
        }
    }

    async findByEmail(email: string): Promise<IUserEntity> {
        try {
            return (await this.dbConnection.query(usersQueries.findByEmail, [email])).rows[0]
        } catch (error) {
            throw error
        }
    }
    async findById(id: string): Promise<IUserEntity> {
        try {
            return (await this.dbConnection.query(usersQueries.findOne, [id])).rows[0]
        } catch (error) {
            throw error
        }
    }
    async update(userId: string, dto: UpdateUserDto) {
        try {
             return (await this.dbConnection.query(usersQueries.update, [
                dto.first_name,
                dto.last_name,
                dto.email,
                dto.password,
                dto.phone,
                dto.dob,
                dto.gender,
                dto.role,
                dto.address,
                userId
             ])).rows[0]
        } catch (error) {
            throw error
        }
    }

    async create(dto: CreateUserDto): Promise<IUserEntity> {
        try {
            const { first_name, last_name, email, password, phone, dob, gender, address } = dto;

            const result = await this.dbConnection.query(usersQueries.create, [
                first_name,
                last_name,
                email,
                password,
                phone,
                dob,
                gender,
                address
            ]);

            const newUser = result.rows[0];

            return newUser;
        } catch (error) {
            throw error
        }
    }
    async delete(id: string): Promise<boolean> {
        const result = await this.dbConnection.query(usersQueries.delete, [id]);
        return result.rowCount > 0;
    }



}
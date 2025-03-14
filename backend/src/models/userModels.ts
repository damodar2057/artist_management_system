// backend/src/models/userModels.ts

import { Pool } from "pg";
import { IUserEntity } from "src/common/interfaces/user.interface";
import db from 'src/db'
import { usersQueries } from "src/db/queries/user.query";
import { CreateUserDto } from "src/dtos/user.dto";

interface FindOptionsWhere<T> {
    
}

export class UserModel {
    private dbConnection: Pool;
    private static instance: UserModel;  // singleton instance
    private constructor(){
        this.dbConnection = db.getInstance().getPool()
    }
    
    public static getInstance(){
        if(!UserModel.instance){
            UserModel.instance  = new UserModel();
        }
        return UserModel.instance;
    }
    
    
    async findAll(): Promise<IUserEntity[]> {
        try {
            return (await this.dbConnection.query(usersQueries.findAll)).rows
        } catch (error) {
            throw error
        }
    }
    
    async findOne(id: string): Promise<IUserEntity> {
        try {
            return (await this.dbConnection.query(usersQueries.findOne,[id])).rows[0]
        } catch (error) {
            throw error
        }
    }
    
    async findByEmail(email: string): Promise<IUserEntity> {
        try {
            return (await this.dbConnection.query(usersQueries.findByEmail,[email])).rows[0]
        } catch (error) {
            throw error
        }
    }
    async findById(id: string): Promise<IUserEntity> {
        try {
            return (await this.dbConnection.query(usersQueries.findOne,[id])).rows[0]
        } catch (error) {
            throw error
        }
    }
    async update(userId: string, dto: any) {
        try {
            // await (await this.dbConnection.query(usersQueries.update))
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
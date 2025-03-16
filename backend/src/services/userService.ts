// backend/src/services/userService.ts

import { BadRequestException } from "src/common/exceptions/badRequest.exception";
import { NotFoundException } from "src/common/exceptions/notFound.exception";
import { IPaginationOptions } from "src/common/interfaces/pagination-options.interface";
import { IUserEntity } from "src/common/interfaces/user.interface";
import { CreateUserDto } from "src/dtos/user.dto";
import { UserModel } from "src/models/userModels";

export class UserService {
    private static instance: UserService;
    private repository: UserModel;

    private constructor() { // singleton
        this.repository = UserModel.getInstance();
    }

    public static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    public async fetchUserById(userId: string): Promise<IUserEntity | null> {
        try {
            const user = await this.repository.findOne(userId);
            if (!user) {
                throw new NotFoundException(`User with id ${userId} not found!`);
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async fetchAllUsers(options: IPaginationOptions): Promise<{ data: IUserEntity[], total: number}> {
        try {
            return await this.repository.findAll(options);
        } catch (error) {
            throw error;
        }
    }

    public async createUser(dto: CreateUserDto): Promise<IUserEntity | null> {
        try {
            const existingUser = await this.repository.findByEmail(dto.email);
            if(existingUser){
                throw new BadRequestException(`User with email ${dto.email} already exists!!`)
            }
            const user = await this.repository.create(dto);
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async updateUser(userId: string, dto: any): Promise<IUserEntity | null> {
        try {
            const user = await this.repository.findOne(userId);
            if (!user) {
                throw new NotFoundException(`User with id ${userId} not found!`);
            }

            const updatedUser = await this.repository.update(userId, dto);
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    public async deleteUser(userId: string): Promise<boolean> {
        try {
            const user = await this.repository.findOne(userId);
            if (!user) {
                throw new NotFoundException(`User with id ${userId} not found!`);
            }

            const result = await this.repository.delete(userId);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

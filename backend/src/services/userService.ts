// backend/src/services/userService.ts

import { NotFoundException } from "src/common/exceptions/notFound.exception";
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

    public async fetchAllUsers(): Promise<IUserEntity[]> {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw error;
        }
    }

    public async createUser(dto: CreateUserDto): Promise<IUserEntity | null> {
        try {
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
            return null;
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

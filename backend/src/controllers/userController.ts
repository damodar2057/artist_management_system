//

import { Request } from "express";
import { NotFoundException } from "src/common/exceptions/notFound.exception";
import { IUserEntity } from "src/common/interfaces/user.interface"
import { UserService } from "src/services/userService"


export class UserController {
    private static instance: UserController;
    private readonly userService: UserService;
    private constructor() {
        this.userService = UserService.getInstance()
    }
    public static getInstance() {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }


    async getAllUsers(req: Request): Promise<IUserEntity[]> {
        try {
            return await this.userService.fetchAllUsers();
        } catch (error) {
            throw error;
        }
    }

    async getUserById(req: Request): Promise<IUserEntity> {
        try {
            const user = await this.userService.fetchUserById(req.params.id);
            if (!user) {
                throw new NotFoundException(`User with ID ${req.params.id} not found.`);
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async createUser(req: Request): Promise<IUserEntity> {
        try {
            return await this.userService.createUser(req.body);
        } catch (error) {
            throw error;
        }
    }

    async updateUser(req: Request): Promise<IUserEntity> {
        try {
            return await this.userService.updateUser(req.params.id, req.body);
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(req: Request): Promise<{ message: string }> {
        try {
            await this.userService.deleteUser(req.params.id);
            return { message: `User with ID ${req.params.id} deleted successfully.` };
        } catch (error) {
            throw error;
        }
    }
}

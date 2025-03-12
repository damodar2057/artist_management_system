// backend/src/services/auth.service.ts


import { NotFoundException } from "src/common/exceptions/notFound.exception";
import { UserModel } from "src/models/userModels";

export class AuthService {
    private static instance: AuthService;
    private repository: UserModel;

    private constructor() {
        this.repository = UserModel.getInstance();
    }

    public static getInstance() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public async login(dto: any): Promise<{ message: string }> {
        try {
            // TODO :: Implement login logic (authentication, token generation, etc.)
            return { message: "Login successful" };
        } catch (error) {
            throw error;
        }
    }

    public async register(dto: any): Promise<{ message: string }> {
        try {
            // TODO :: Implement registration logic (creating new user, etc.)
            return { message: "Registration successful" };
        } catch (error) {
            throw error;
        }
    }
}

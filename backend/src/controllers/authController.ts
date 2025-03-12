//

import { Request } from "express";
import { AuthService } from "src/services/auth.service";

export class AuthController {
    private static instance: AuthController;
    private readonly authService: AuthService;

    private constructor() {
        this.authService = AuthService.getInstance();
    }

    public static getInstance() {
        if (!AuthController.instance) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }

    async login(req: Request): Promise<any> {
        try {
            return await this.authService.login(req.body);
        } catch (error) {
            throw error;
        }
    }

    async register(req: Request): Promise<any> {
        try {
            return await this.authService.register(req.body);
        } catch (error) {
            throw error;
        }
    }
}

// backend/src/services/auth.service.ts


import { NotFoundException } from "src/common/exceptions/notFound.exception";
import { ConflictException } from "src/common/exceptions/resource-conflict.exception";
import { UnauthorizedException } from "src/common/exceptions/unauthorized.exception";
import appConfig from "src/config/app.config";
import { LoginDto } from "src/dtos/login.dto";
import { RegisterDto } from "src/dtos/register.dto";
import { UserModel } from "src/models/userModels";
import { hashPassword, verifyHash } from "src/utils/hash-password.util";
import { signJwtToken } from "src/utils/jwt.util";

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

    public async login(dto: LoginDto): Promise<{ accessToken: string, expiresIn: number }> {
        try {
            // first check if user with this email already exist
            const existingUser = await this.repository.findByEmail(dto.username)
            if (!existingUser) {
                throw new NotFoundException(`User not found!`)
            }
            if (!await verifyHash(dto.password, existingUser.password)) {
                throw new UnauthorizedException('Invalid credentials')
            }

            return {
                accessToken: await signJwtToken({
                    ...existingUser,
                }),
                expiresIn: +(appConfig.jwtExpiryInterval) * 60 * 60

            };
        } catch (error) {
            throw error;
        }
    }

    public async register(dto: RegisterDto): Promise<{ message: string }> {
        try {
            // first check if user with this email already exist
            const existingUser = await this.repository.findByEmail(dto.email)
            if (existingUser) {
                throw new ConflictException(`User with ${dto.email} already exists`)
            }
            await this.repository.create({
                ...dto,
                password: await hashPassword(dto.password)
            })
            return { message: "Registration successful" };
        } catch (error) {
            throw error;
        }
    }
}

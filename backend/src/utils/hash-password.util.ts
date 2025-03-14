// backend/src/utils/hash-password.util.ts

import * as bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
}

export async function verifyHash(plainPassword: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashPassword)
}
//

import { Pool } from "pg";
import { IBaseModel } from "src/common/interfaces/model.interface";
import { IUserEntity } from "src/common/interfaces/user.interface";


const userModel: IBaseModel<IUserEntity> = {
    findAll: function (): Promise<IUserEntity[]> {
        throw new Error('Not implemented.')
    },
    findOne: function (): Promise<IUserEntity> {
        throw new Error('Not implemented.')
    },
    update: function (): Promise<IUserEntity> {
        throw new Error('Not implemented.')
    },
    delete: function (): Promise<void> {
        throw new Error('Not implemented.')
    },
    create: function (): Promise<IUserEntity> {
        throw new Error('Not implemented.')
    }
}
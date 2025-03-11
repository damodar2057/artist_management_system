//
import { IBaseModel } from 'src/common/interfaces/model.interface'
import { DbTables } from '../common/constants/db-tables.enum'
import dbOperationHelper from '../db/helpers'
import { IMusicEntity } from 'src/common/interfaces/music.interface'

const musicModel: IBaseModel<IMusicEntity> = {
    findAll: function (): Promise<IMusicEntity[]> {
        throw new Error('Not implemented.')
    },
    findOne: function (): Promise<IMusicEntity> {
        throw new Error('Not implemented.')
    },
    update: function (): Promise<IMusicEntity> {
        throw new Error('Not implemented.')
    },
    delete: function (): Promise<void> {
        throw new Error('Not implemented.')
    },
    create: function (): Promise<IMusicEntity> {
        throw new Error('Not implemented.')
    }
}
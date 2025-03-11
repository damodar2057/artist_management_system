// backend/src/models/artistModel.ts

// TODO 
import { IArtistEntity } from 'src/common/interfaces/artist.interface'
import { DbTables } from '../common/constants/db-tables.enum'
import dbOperationHelper from '../db/helpers'
import { IBaseModel } from 'src/common/interfaces/model.interface'

const artistModel: IBaseModel<IArtistEntity> = {
    findAll: function (): Promise<IArtistEntity[]> {
        throw new Error('Not implemented.')
    },
    findOne: function (): Promise<IArtistEntity> {
        throw new Error('Not implemented.')
    },
    update: function (): Promise<IArtistEntity> {
        throw new Error('Not implemented.')
    },
    delete: function (): Promise<void> {
        throw new Error('Not implemented.')
    },
    create: function (): Promise<IArtistEntity> {
        throw new Error('Not implemented.')
    }
}
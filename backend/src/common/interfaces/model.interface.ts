//


export interface IBaseModel<T> {
    findAll(): Promise<T[]>;
    findOne(): Promise<T>;
    update(): Promise<T>;
    delete(): Promise<void>;
    create(): Promise<T>;
}
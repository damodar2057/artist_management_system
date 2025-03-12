//


export interface IBaseModel<T> {
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T>;
    findById(id: string): Promise<T>;
    update(userId: string, dto: any): Promise<T>;
    create(dto: any): Promise<T> ;
    delete(id: string): Promise<boolean> ;
}
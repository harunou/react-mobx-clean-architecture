import type { UniqueEntityDto, CollectableEntity } from './Entity';

export interface EntityCollection<
    TDto extends UniqueEntityDto,
    TEntity extends CollectableEntity<TDto>,
> {
    readonly entities: TEntity[];
    readonly ids: Array<TEntity['id']>;
    readonly amountOfEntities: number;
    readonly hasEntities: boolean;

    get(id: TEntity['id'] | undefined): TEntity | undefined;

    hasEntity(id: TEntity['id'] | undefined): boolean;

    add(entity: TEntity): void;

    addFromDto(dto: TDto): void;

    patch(id: TEntity['id'], dto: Partial<TDto>): void;

    remove(id: TEntity['id']): void;

    replace(id: TEntity['id'], entity: TEntity): void;

    replaceFromDto(id: TEntity['id'], entity: TDto): void;

    replaceAll(entities: TEntity[]): void;

    replaceAllFromDto(dto: TDto[]): void;
}

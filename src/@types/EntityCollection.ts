import type { UniqueEntityDto, CollectableEntity } from './Entity';

// NOTE(harunou): look into RTK entity collection interface
export interface EntityCollection<
    TDto extends UniqueEntityDto,
    TEntity extends CollectableEntity<TDto>,
> {
    readonly models: TEntity[];
    readonly ids: Array<TEntity['id']>;
    readonly length: number;

    get(id: TEntity['id'] | undefined): TEntity | undefined;

    has(id: TEntity['id'] | undefined): boolean;

    add(entity: TEntity): void;

    addFromDto(dto: TDto): void;

    patch(id: TEntity['id'], dto: Partial<TDto>): void;

    remove(id: TEntity['id']): void;

    replace(id: TEntity['id'], entity: TEntity): void;

    replaceFromDto(id: TEntity['id'], entity: TDto): void;

    replaceAll(entities: TEntity[]): void;

    replaceAllFromDto(dto: TDto[]): void;
}

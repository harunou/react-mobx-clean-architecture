import { computed, observable, action, makeObservable } from 'mobx';
import type {
    CollectableEntity,
    EntityCollection,
    UniqueEntityDto,
    EntityDtoToEntityMapper,
} from '../../@types';

export abstract class AbstractCollection<
    TDto extends UniqueEntityDto,
    TEntity extends CollectableEntity<TDto>,
> implements EntityCollection<TDto, TEntity>
{
    private readonly _entities = observable.map<TEntity['id'], TEntity>();

    constructor(
        private readonly dtoToEntityMapper: EntityDtoToEntityMapper<TDto, TEntity>,
        entities: TEntity[] = [],
    ) {
        makeObservable(this);
        this.replaceAll(entities);
    }

    @computed
    get entities(): TEntity[] {
        return Array.from(this._entities.values());
    }

    @computed
    get ids(): Array<TEntity['id']> {
        return Array.from(this._entities.keys());
    }

    @computed
    get amountOfEntities(): number {
        return this._entities.size;
    }

    @computed
    get hasEntities(): boolean {
        return this._entities.size > 0;
    }

    get(id: TEntity['id'] | undefined): TEntity | undefined {
        if (id === undefined) {
            return undefined;
        }
        return this._entities.get(id);
    }

    hasEntity(id: TEntity['id'] | undefined): boolean {
        if (id === undefined) {
            return false;
        }
        return this._entities.has(id);
    }

    @action
    add(model: TEntity): void {
        this._entities.set(model.id, model);
    }

    @action
    addFromDto(data: TDto): void {
        this.add(this.dtoToEntityMapper(data));
    }

    @action
    patch(id: TEntity['id'], data: Partial<TDto>): void {
        const model = this.get(id);
        if (model) {
            model.patchData(data);
        }
    }

    @action
    remove(id: TEntity['id']): void {
        this._entities.delete(id);
    }

    @action
    replace(id: TEntity['id'], newEntity: TEntity): void {
        if (this._entities.has(id)) {
            this._entities.set(id, newEntity);
        }
    }

    @action
    replaceFromDto(id: TEntity['id'], data: TDto): void {
        this.replace(id, this.dtoToEntityMapper(data));
    }

    @action
    replaceAll(models: TEntity[]): void {
        this._entities.clear();
        models.forEach((model) => this._entities.set(model.id, model));
    }

    @action
    replaceAllFromDto(data: TDto[]): void {
        const entities = data.map((row) => this.dtoToEntityMapper(row));
        this.replaceAll(entities);
    }
}

import { AbstractCollection } from './AbstractCollection';
import type { UniqueEntityDto, CollectableEntity } from '../../@types';

interface TestEntityDto extends UniqueEntityDto<number> {
    name: string;
}
interface TestEntity extends CollectableEntity<TestEntityDto> {
    name: string;
}

const entityDtoToEntityMapper = (dto: TestEntityDto): TestEntity => ({
    name: 'entity',
    id: dto.id,
    get dto(): TestEntityDto {
        return dto;
    },
    setData: (data): void => {
        void data;
    },
    patchData: (data): void => {
        void data;
    },
});

const entityToEntityDtoMapper = (entity: TestEntity): TestEntityDto => entity.dto;

class Collection extends AbstractCollection<TestEntityDto, TestEntity> {
    static make(entitiesDto: TestEntityDto[] = []): Collection {
        return new Collection(entityDtoToEntityMapper, entitiesDto.map(entityDtoToEntityMapper));
    }
}

describe('AbstractCollection', () => {
    let dto0: TestEntityDto;
    let dto1: TestEntityDto;
    let dto2: TestEntityDto;
    let dto3: TestEntityDto;
    let entity0: TestEntity;
    let entity1: TestEntity;
    let entity2: TestEntity;
    let entity3: TestEntity;

    beforeEach(() => {
        jest.resetAllMocks();
        dto0 = { id: 0, name: '0' };
        dto1 = { id: 1, name: '1' };
        dto2 = { id: 2, name: '2' };
        dto3 = { id: 3, name: '3' };
        entity0 = entityDtoToEntityMapper(dto0);
        entity1 = entityDtoToEntityMapper(dto1);
        entity2 = entityDtoToEntityMapper(dto2);
        entity3 = entityDtoToEntityMapper(dto3);
    });

    describe(`collection.add`, () => {
        it('adds an entity to the collection', () => {
            const collection = Collection.make();

            collection.add(entity0);

            const result = collection.entities.map(entityToEntityDtoMapper);

            expect(result).toContain(entity0.dto);
        });
        it('replaces the existing entity when adding an entity with a duplicate ID', () => {
            const collection = Collection.make([dto0]);
            const similarToDto0: TestEntityDto = { id: dto0.id, name: '1' };
            collection.add(entityDtoToEntityMapper(similarToDto0));

            const result = collection.entities.map(entityToEntityDtoMapper);

            expect(result).not.toContainEqual(dto0);
            expect(result).toContainEqual(similarToDto0);
        });
    });

    describe(`collection.addFromDto`, () => {
        it('adds an entity converted from DTO to the collection', () => {
            const entityDtoToEntityMapperMock = jest.fn(entityDtoToEntityMapper);
            const collection = new Collection(entityDtoToEntityMapperMock, [entity0]);

            collection.addFromDto(dto1);

            const result = collection.entities.map(entityToEntityDtoMapper);

            expect(entityDtoToEntityMapperMock).toHaveBeenCalledWith(dto1);
            expect(result.length).toEqual(2);
            expect(result).toContainEqual(dto0);
            expect(result).toContainEqual(dto1);
        });
    });

    describe(`collection.patch`, () => {
        it('updates an entity in the collection', () => {
            jest.spyOn(entity0, 'patchData');
            const data: Partial<TestEntityDto> = { name: 'update-name' };
            const collection = new Collection(entityDtoToEntityMapper, [entity0]);

            collection.patch(entity0.id, data);

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(entity0.patchData).toHaveBeenCalledWith(data);
        });

        it('does nothing when trying to patch a non-existent entity', () => {
            jest.spyOn(entity0, 'patchData');
            const collection = Collection.make([dto0]);

            collection.patch(9000, { name: 'updated-name' });

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(entity0.patchData).not.toHaveBeenCalled();
        });
    });

    describe(`collection.remove`, () => {
        it('removes an entity from the collection', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            collection.remove(dto0.id);

            const result = collection.entities.map(entityToEntityDtoMapper);

            expect(result.length).toEqual(2);
            expect(result).not.toContainEqual(dto0);
        });

        it('does nothing when trying to remove a non-existent entity', () => {
            const collection = Collection.make([dto0]);

            collection.remove(9000);

            expect(collection.entities).toHaveLength(1);
        });
    });

    describe(`collection.replace`, () => {
        it('replaces an entity in the collection with a new entity', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            collection.replace(entity0.id, entity3);

            const result = collection.entities.map(entityToEntityDtoMapper);

            expect(result.length).toEqual(3);
            expect(result).toContainEqual(dto3);
            expect(result).not.toContainEqual(dto0);
        });

        it('does nothing when trying to replace a non-existent entity', () => {
            const collection = Collection.make([dto0]);

            collection.replace(9000, entity3);

            const result = collection.entities.map(entityToEntityDtoMapper);

            expect(result).not.toContainEqual(dto3);
            expect(result).toContainEqual(dto0);
        });
    });

    describe(`collection.replaceFromDto`, () => {
        it('replaces an entity in the collection converted from DTO', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            collection.replaceFromDto(entity0.id, dto3);

            const result = collection.entities.map(entityToEntityDtoMapper);

            expect(result.length).toEqual(3);
            expect(result).toContainEqual(dto3);
            expect(result).not.toContainEqual(dto0);
        });
        it('does nothing when trying to replace a non-existent entity', () => {
            const collection = Collection.make([dto0]);

            collection.replaceFromDto(9000, dto3);

            const result = collection.entities.map(entityToEntityDtoMapper);

            expect(result).not.toContainEqual(dto3);
            expect(result).toContainEqual(dto0);
        });
    });

    describe(`collection.replaceAll`, () => {
        it('replaces all entities in the collection', () => {
            const collection = Collection.make([dto0]);

            collection.replaceAll([entity1, entity2]);

            const result = collection.entities.map(entityToEntityDtoMapper);

            expect(result.length).toEqual(2);
            expect(result).toContainEqual(dto1);
            expect(result).toContainEqual(dto2);
        });
    });

    describe(`collection.replaceAllFromDto`, () => {
        it('replaces all entities in the collection converted from DTOs', () => {
            const collection = Collection.make([dto0]);

            collection.replaceAllFromDto([dto1, dto3]);

            const result = collection.entities.map(entityToEntityDtoMapper);

            expect(result.length).toEqual(2);
            expect(result).toContainEqual(dto1);
            expect(result).toContainEqual(dto3);
        });
    });

    describe(`collection.get`, () => {
        it('retrieves a entity by its ID', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            const result = collection.get(entity1.id);

            expect(result).not.toBeUndefined();
            expect(result?.dto).toEqual(entity1.dto);
        });
        it('returns undefined when entity with given ID is not found', () => {
            const collection = Collection.make();

            const result = collection.get(9000);

            expect(result).toBeUndefined();
        });
        it('returns undefined when the given ID is undefined', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            const result = collection.get(undefined);

            expect(result).toBeUndefined();
        });
    });

    describe(`collection.ids`, () => {
        it('returns an array of entity IDs', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            const result = collection.ids;
            const expected = [dto0.id, dto1.id, dto2.id];

            expect(result).toEqual(expected);
        });
        it('returns an empty array when there are no entities in the collection', () => {
            const collection = Collection.make();

            const result = collection.ids;

            expect(result).toHaveLength(0);
        });
    });

    describe(`collection.amountOfEntities`, () => {
        it('returns the number of entities in the collection', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            const amount = collection.amountOfEntities;

            expect(amount).toEqual(3);
        });

        it('returns 0 when there are no entities in the collection', () => {
            const collection = Collection.make();

            const amount = collection.amountOfEntities;

            expect(amount).toEqual(0);
        });
    });

    describe(`collection.hasEntities`, () => {
        it('returns true when there are entities in the collection', () => {
            const collection = Collection.make([dto0]);

            const hasEntities = collection.hasEntities;

            expect(hasEntities).toEqual(true);
        });

        it('returns false when there are no entities in the collection', () => {
            const collection = Collection.make();

            const hasEntities = collection.hasEntities;

            expect(hasEntities).toEqual(false);
        });
    });

    describe(`collection.hasEntity`, () => {
        it('returns true when the collection has an entity with the given ID', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            const result = collection.hasEntity(dto1.id);

            expect(result).toBe(true);
        });

        it('returns false when the collection does not have an entity with the given ID', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            const result = collection.hasEntity(9999);

            expect(result).toBe(false);
        });

        it('returns false when the given ID is undefined', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            const result = collection.hasEntity(undefined);

            expect(result).toBe(false);
        });
    });
});

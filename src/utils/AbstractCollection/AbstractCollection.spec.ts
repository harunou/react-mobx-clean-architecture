import { AbstractCollection } from './AbstractCollection';
import type { UniqueEntityDto, CollectableEntity } from '../../@types';

interface TestEntityDto extends UniqueEntityDto<number> {
    name: string;
}
interface TestEntity extends CollectableEntity<TestEntityDto> {
    name: string;
}

const modelDtoToModelMapper = (dto: TestEntityDto): TestEntity => ({
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

const modelToModelDtoMapper = (entity: TestEntity): TestEntityDto => entity.dto;

class Collection extends AbstractCollection<TestEntityDto, TestEntity> {
    static make(entitiesDto: TestEntityDto[] = []): Collection {
        return new Collection(modelDtoToModelMapper, entitiesDto.map(modelDtoToModelMapper));
    }
}

describe('AbstractCollection', () => {
    let dto0: TestEntityDto;
    let dto1: TestEntityDto;
    let dto2: TestEntityDto;
    let dto3: TestEntityDto;
    let model0: TestEntity;
    let model1: TestEntity;
    let model2: TestEntity;
    let model3: TestEntity;

    beforeEach(() => {
        jest.resetAllMocks();
        dto0 = { id: 0, name: '0' };
        dto1 = { id: 1, name: '1' };
        dto2 = { id: 2, name: '2' };
        dto3 = { id: 3, name: '3' };
        model0 = modelDtoToModelMapper(dto0);
        model1 = modelDtoToModelMapper(dto1);
        model2 = modelDtoToModelMapper(dto2);
        model3 = modelDtoToModelMapper(dto3);
    });

    describe(`collection.add`, () => {
        it('adds an item to the collection', () => {
            const collection = Collection.make();

            collection.add(model0);

            const result = collection.models.map(modelToModelDtoMapper);

            expect(result).toContain(model0.dto);
        });
        it('replaces the existing item when adding an entity with a duplicate ID', () => {
            const collection = Collection.make([dto0]);
            const similarToDto0: TestEntityDto = { id: dto0.id, name: '1' };
            collection.add(modelDtoToModelMapper(similarToDto0));

            const result = collection.models.map(modelToModelDtoMapper);

            expect(result).not.toContainEqual(dto0);
            expect(result).toContainEqual(similarToDto0);
        });
    });

    describe(`collection.addFromDto`, () => {
        it('adds an item converted from DTO to the collection', () => {
            const modelDtoToModelMapperMock = jest.fn(modelDtoToModelMapper);
            const collection = new Collection(modelDtoToModelMapperMock, [model0]);

            collection.addFromDto(dto1);

            const result = collection.models.map(modelToModelDtoMapper);

            expect(modelDtoToModelMapperMock).toHaveBeenCalledWith(dto1);
            expect(result.length).toEqual(2);
            expect(result).toContainEqual(dto0);
            expect(result).toContainEqual(dto1);
        });
    });

    describe(`collection.patch`, () => {
        it('updates an item in the collection', () => {
            jest.spyOn(model0, 'patchData');
            const data: Partial<TestEntityDto> = { name: 'update-name' };
            const collection = new Collection(modelDtoToModelMapper, [model0]);

            collection.patch(model0.id, data);

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(model0.patchData).toHaveBeenCalledWith(data);
        });

        it('does nothing when trying to patch a non-existent item', () => {
            jest.spyOn(model0, 'patchData');
            const collection = Collection.make([dto0]);

            collection.patch(9000, { name: 'updated-name' });

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(model0.patchData).not.toHaveBeenCalled();
        });
    });

    describe(`collection.remove`, () => {
        it('removes an item from the collection', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            collection.remove(dto0.id);

            const result = collection.models.map(modelToModelDtoMapper);

            expect(result.length).toEqual(2);
            expect(result).not.toContainEqual(dto0);
        });

        it('does nothing when trying to remove a non-existent item', () => {
            const collection = Collection.make([dto0]);

            collection.remove(9000);

            expect(collection.models).toHaveLength(1);
        });
    });

    describe(`collection.replace`, () => {
        it('replaces an item in the collection with a new entity', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            collection.replace(model0.id, model3);

            const result = collection.models.map(modelToModelDtoMapper);

            expect(result.length).toEqual(3);
            expect(result).toContainEqual(dto3);
            expect(result).not.toContainEqual(dto0);
        });

        it('does nothing when trying to replace a non-existent item', () => {
            const collection = Collection.make([dto0]);

            collection.replace(9000, model3);

            const result = collection.models.map(modelToModelDtoMapper);

            expect(result).not.toContainEqual(dto3);
            expect(result).toContainEqual(dto0);
        });
    });

    describe(`collection.replaceFromDto`, () => {
        it('replaces an item in the collection converted from DTO', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            collection.replaceFromDto(model0.id, dto3);

            const result = collection.models.map(modelToModelDtoMapper);

            expect(result.length).toEqual(3);
            expect(result).toContainEqual(dto3);
            expect(result).not.toContainEqual(dto0);
        });
        it('does nothing when trying to replace a non-existent item', () => {
            const collection = Collection.make([dto0]);

            collection.replaceFromDto(9000, dto3);

            const result = collection.models.map(modelToModelDtoMapper);

            expect(result).not.toContainEqual(dto3);
            expect(result).toContainEqual(dto0);
        });
    });

    describe(`collection.replaceAll`, () => {
        it('replaces all items in the collection', () => {
            const collection = Collection.make([dto0]);

            collection.replaceAll([model1, model2]);

            const result = collection.models.map(modelToModelDtoMapper);

            expect(result.length).toEqual(2);
            expect(result).toContainEqual(dto1);
            expect(result).toContainEqual(dto2);
        });
    });

    describe(`collection.replaceAllFromDto`, () => {
        it('replaces all items in the collection converted from DTOs', () => {
            const collection = Collection.make([dto0]);

            collection.replaceAllFromDto([dto1, dto3]);

            const result = collection.models.map(modelToModelDtoMapper);

            expect(result.length).toEqual(2);
            expect(result).toContainEqual(dto1);
            expect(result).toContainEqual(dto3);
        });
    });

    describe(`collection.get`, () => {
        it('retrieves a item by its ID', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            const result = collection.get(model1.id);

            expect(result).not.toBeUndefined();
            expect(result?.dto).toEqual(model1.dto);
        });
        it('returns undefined when item with given ID is not found', () => {
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
        it('returns an array of item IDs', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            const result = collection.ids;
            const expected = [dto0.id, dto1.id, dto2.id];

            expect(result).toEqual(expected);
        });
        it('returns an empty array when there are no items in the collection', () => {
            const collection = Collection.make();

            const result = collection.ids;

            expect(result).toHaveLength(0);
        });
    });

    describe(`collection.length`, () => {
        it('returns the number of items in the collection', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            const amount = collection.length;

            expect(amount).toEqual(3);
        });

        it('returns 0 when there are no items in the collection', () => {
            const collection = Collection.make();

            const amount = collection.length;

            expect(amount).toEqual(0);
        });
    });

    describe(`collection.has`, () => {
        it('returns true when the collection has an item with the given ID', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            const result = collection.has(dto1.id);

            expect(result).toBe(true);
        });

        it('returns false when the collection does not have an item with the given ID', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            const result = collection.has(9999);

            expect(result).toBe(false);
        });

        it('returns false when the given ID is undefined', () => {
            const collection = Collection.make([dto0, dto1, dto2]);

            const result = collection.has(undefined);

            expect(result).toBe(false);
        });
    });
});

import { DomainModel } from '../domain/domain.types';
import {
    Selector,
    SelectorBuilder,
    UseCase,
    UseCaseBuilder
} from '../stores.types';
import { PersistenceModel } from '../persistence/persistence.types';
import { AppStore } from './app.store';

describe(`${AppStore.name}`, () => {
    let model: DomainModel;
    let persistence: PersistenceModel;
    let store: AppStore;

    beforeEach(() => {
        model = {} as DomainModel;
        persistence = {} as PersistenceModel;
        store = new AppStore(model, persistence);
    });

    it('has use case executer', () => {
        const useCaseMock: UseCase = {
            execute: jest.fn()
        };
        const useCaseBuilderMock: UseCaseBuilder<
            DomainModel,
            PersistenceModel
        > = {
            build: jest.fn().mockReturnValue(useCaseMock)
        };
        store.execute(useCaseBuilderMock);
        expect(useCaseBuilderMock.build).toBeCalledTimes(1);
        expect(useCaseBuilderMock.build).toBeCalledWith(model, persistence);
        expect(useCaseMock.execute).toBeCalledTimes(1);
    });
    it('has use query executer', () => {
        const queryResult = 0;
        const selectMock: Selector<number> = {
            result: queryResult
        };
        const selectBuilderMock: SelectorBuilder<DomainModel, number> = {
            build: jest.fn().mockReturnValue(selectMock)
        };
        const query = store.query(selectBuilderMock);
        expect(selectBuilderMock.build).toBeCalledTimes(1);
        expect(selectBuilderMock.build).toBeCalledWith(model);
        expect(query.result).toEqual(queryResult);
    });
});

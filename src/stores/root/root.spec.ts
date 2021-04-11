import { Domain } from '../domain/domain.types';
import {
    Selector,
    SelectorBuilder,
    UseCase,
    UseCaseBuilder
} from '../helpers/stores.types';
import { Persistence } from '../persistenceStore/persistenceStore.types';
import { RootStore } from './root.store';
import { StoreFacade } from './root.types';

describe(`${RootStore.name}`, () => {
    let model: Domain;
    let persistence: Persistence;
    let store: StoreFacade<Domain, Persistence>;

    beforeEach(() => {
        model = {} as Domain;
        persistence = {} as Persistence;
        store = new RootStore(model, persistence);
    });

    it('has use case executer', () => {
        const useCaseMock: UseCase = {
            execute: jest.fn()
        };
        const useCaseBuilderMock: UseCaseBuilder<Domain, Persistence> = {
            build: jest.fn().mockReturnValue(useCaseMock)
        };
        store.execute(useCaseBuilderMock);
        expect(useCaseBuilderMock.build).toBeCalledTimes(1);
        expect(useCaseBuilderMock.build).toBeCalledWith(model, persistence);
        expect(useCaseMock.execute).toBeCalledTimes(1);
    });
    it('has use query executer', () => {
        const queryResult = 0;
        const selectMock: Selector = {
            result: queryResult
        };
        const selectBuilderMock: SelectorBuilder<Domain> = {
            build: jest.fn().mockReturnValue(selectMock)
        };
        const query = store.query(selectBuilderMock);
        expect(selectBuilderMock.build).toBeCalledTimes(1);
        expect(selectBuilderMock.build).toBeCalledWith(model);
        expect(query.result).toEqual(queryResult);
    });
});

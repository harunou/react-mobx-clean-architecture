import { Domain } from '../domain/domain.types';
import {
    Selector,
    SelectorBuilder,
    UseCase,
    UseCaseBuilder
} from '../helpers/stores.types';
import { PersistenceModel } from '../persistence/persistence.types';
import { RootStore } from './root.store';
import { StoreFacade } from './root.types';

describe(`${RootStore.name}`, () => {
    let model: Domain;
    let persistence: PersistenceModel;
    let store: StoreFacade<Domain, PersistenceModel>;

    beforeEach(() => {
        model = {} as Domain;
        persistence = {} as PersistenceModel;
        store = new RootStore(model, persistence);
    });

    it('has use case executer', () => {
        const useCaseMock: UseCase = {
            execute: jest.fn()
        };
        const useCaseBuilderMock: UseCaseBuilder<Domain, PersistenceModel> = {
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
